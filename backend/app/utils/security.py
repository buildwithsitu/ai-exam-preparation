import base64
import datetime
import hashlib
import hmac
import json
import os
import secrets
import time
from functools import wraps
from typing import Any, Callable, Dict, Optional, Tuple
from flask import current_app, g, request

try:
    import jwt
    _HAS_PYJWT = True
except ImportError:
    jwt = None
    _HAS_PYJWT = False

from app.utils.errors import UnauthorizedError


def hash_password(password: str) -> str:
    """
    Hash a password securely using PBKDF2 with SHA-256 and a random salt.
    Format: pbkdf2:sha256:100000$<salt_hex>$<hash_hex>
    """
    if not password or not isinstance(password, str):
        raise ValueError("Password must be a non-empty string.")

    salt = secrets.token_hex(16)
    iterations = 100_000
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        iterations,
    ).hex()
    return f"pbkdf2:sha256:{iterations}${salt}${digest}"


def verify_password(password: str, stored_hash: str) -> bool:
    """
    Verify a plaintext password against a stored PBKDF2 hash
    using constant-time comparison to prevent timing attacks.
    """
    if not password or not stored_hash:
        return False

    try:
        parts = stored_hash.split("$")
        if len(parts) != 3:
            return False

        header, salt, expected_digest = parts
        # header format: pbkdf2:sha256:iterations
        header_parts = header.split(":")
        if len(header_parts) != 3 or header_parts[0] != "pbkdf2" or header_parts[1] != "sha256":
            return False

        iterations = int(header_parts[2])
        computed_digest = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            iterations,
        ).hex()

        return hmac.compare_digest(computed_digest, expected_digest)
    except Exception:
        return False


def get_jwt_secret() -> str:
    """Retrieve secret key from Flask app config or environment."""
    if current_app:
        return current_app.config.get("SECRET_KEY", "dev-secret-key-change-in-production")
    return os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")


def generate_otp(length: int = 6) -> str:
    """
    Generate a cryptographically secure numeric OTP using Python's secrets module.
    Pads with leading zeroes to ensure exact length (e.g. '048291').
    """
    if length < 4:
        length = 6
    max_val = 10 ** length
    code = secrets.randbelow(max_val)
    return f"{code:0{length}d}"


def hash_otp(otp: str) -> str:
    """
    Hash an OTP code using HMAC-SHA256 with server-side SECRET_KEY.
    Ensures OTP is NEVER stored in plaintext in the database.
    """
    if not otp:
        raise ValueError("OTP code cannot be empty.")
    secret = get_jwt_secret().encode("utf-8")
    clean_otp = otp.strip().encode("utf-8")
    return hmac.new(secret, clean_otp, hashlib.sha256).hexdigest()


def verify_otp(otp: str, stored_hash: str) -> bool:
    """
    Safely compare an entered OTP code against the stored HMAC-SHA256 hash
    using constant-time comparison to prevent timing attacks.
    """
    if not otp or not stored_hash:
        return False
    try:
        computed = hash_otp(otp)
        return hmac.compare_digest(computed, stored_hash)
    except Exception:
        return False


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _b64url_decode(s: str) -> bytes:
    padding = "=" * ((4 - (len(s) % 4)) % 4)
    return base64.urlsafe_b64decode((s + padding).encode("ascii"))


def generate_auth_token(
    user_id: int,
    email: str,
    expires_in_days: int = 7,
) -> Tuple[str, datetime.datetime]:
    """
    Generate a signed JWT authentication token for a user.
    Uses PyJWT if installed, otherwise built-in HMAC-SHA256.
    Returns (token_string, expiration_datetime).
    """
    secret = get_jwt_secret()
    now = datetime.datetime.now(datetime.timezone.utc)
    expiration = now + datetime.timedelta(days=expires_in_days)

    payload = {
        "sub": user_id,
        "email": email,
        "iat": int(now.timestamp()),
        "exp": int(expiration.timestamp()),
        "iss": "exammate-ai",
    }

    if _HAS_PYJWT and jwt is not None:
        token = jwt.encode(payload, secret, algorithm="HS256")
        if isinstance(token, bytes):
            token = token.decode("utf-8")
        return token, expiration

    # Built-in zero-dependency HS256 JWT generator
    header = {"alg": "HS256", "typ": "JWT"}
    header_b64 = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b64 = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = f"{header_b64}.{payload_b64}".encode("ascii")
    signature = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    sig_b64 = _b64url_encode(signature)

    token = f"{header_b64}.{payload_b64}.{sig_b64}"
    return token, expiration


def decode_auth_token(token: str) -> Dict[str, Any]:
    """
    Verify and decode a JWT authentication token.
    Raises UnauthorizedError on expiration or invalid signature.
    """
    secret = get_jwt_secret()

    if _HAS_PYJWT and jwt is not None:
        try:
            payload = jwt.decode(
                token,
                secret,
                algorithms=["HS256"],
                issuer="exammate-ai",
                options={"require": ["sub", "exp", "iat"]},
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise UnauthorizedError(message="Authentication token has expired. Please log in again.")
        except jwt.InvalidTokenError as exc:
            raise UnauthorizedError(message=f"Invalid authentication token: {str(exc)}")

    # Built-in zero-dependency HS256 JWT verifier
    try:
        parts = token.strip().split(".")
        if len(parts) != 3:
            raise UnauthorizedError(message="Invalid authentication token format.")

        header_b64, payload_b64, sig_b64 = parts
        signing_input = f"{header_b64}.{payload_b64}".encode("ascii")
        expected_sig = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
        actual_sig = _b64url_decode(sig_b64)

        if not hmac.compare_digest(expected_sig, actual_sig):
            raise UnauthorizedError(message="Invalid authentication token signature.")

        payload_bytes = _b64url_decode(payload_b64)
        payload = json.loads(payload_bytes.decode("utf-8"))

        if payload.get("iss") != "exammate-ai":
            raise UnauthorizedError(message="Invalid authentication token issuer.")

        exp = payload.get("exp")
        if exp is not None and time.time() > float(exp):
            raise UnauthorizedError(message="Authentication token has expired. Please log in again.")

        if "sub" not in payload:
            raise UnauthorizedError(message="Invalid authentication token: missing subject.")

        return payload
    except UnauthorizedError:
        raise
    except Exception as exc:
        raise UnauthorizedError(message=f"Invalid authentication token: {str(exc)}")


def extract_token_from_request() -> Optional[str]:
    """
    Extract token from either:
    1. Authorization header ('Bearer <token>')
    2. HttpOnly cookie ('auth_token')
    """
    auth_header = request.headers.get("Authorization")
    if auth_header:
        parts = auth_header.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            return parts[1]

    # Fallback to session cookie
    cookie_token = request.cookies.get("auth_token")
    if cookie_token:
        return cookie_token

    return None


def require_auth(f: Callable) -> Callable:
    """
    Route decorator ensuring the request is made by an authenticated user.
    Populates flask.g.current_user with the User entity.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token_from_request()
        if not token:
            raise UnauthorizedError(
                message="Authentication required. Please provide a valid Bearer token or sign in."
            )

        payload = decode_auth_token(token)
        user_id = payload.get("sub")

        # Import User and db here to avoid circular dependencies
        from app.extensions import db
        from app.models.user import User

        user = db.session.get(User, user_id)
        if not user or not user.is_active:
            raise UnauthorizedError(message="User account does not exist or has been deactivated.")

        g.current_user = user
        return f(*args, **kwargs)

    return decorated


def optional_auth(f: Callable) -> Callable:
    """
    Route decorator that checks authentication if present,
    setting flask.g.current_user to the User entity or None.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        g.current_user = None
        token = extract_token_from_request()
        if token:
            try:
                payload = decode_auth_token(token)
                user_id = payload.get("sub")
                from app.extensions import db
                from app.models.user import User
                user = db.session.get(User, user_id)
                if user and user.is_active:
                    g.current_user = user
            except Exception:
                g.current_user = None
        return f(*args, **kwargs)

    return decorated
