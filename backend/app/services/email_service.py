import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional
from flask import current_app
from app.utils.errors import ServiceUnavailableError


class EmailService:
    """
    Handles outbound transactional emails via SMTP (e.g., Gmail SMTP).
    Ensures credentials, passwords, and OTP codes are NEVER logged or exposed.
    """

    @classmethod
    def get_smtp_config(cls) -> dict:
        host = None
        port = 587
        username = None
        password = None
        from_email = None

        if current_app:
            host = current_app.config.get("SMTP_HOST")
            port = int(current_app.config.get("SMTP_PORT", 587))
            username = current_app.config.get("SMTP_USERNAME")
            password = current_app.config.get("SMTP_PASSWORD")
            from_email = current_app.config.get("SMTP_FROM_EMAIL")

        host = host or os.getenv("SMTP_HOST", "smtp.gmail.com")
        port = int(port or os.getenv("SMTP_PORT", 587))
        username = username or os.getenv("SMTP_USERNAME")
        password = password or os.getenv("SMTP_PASSWORD")
        from_email = from_email or os.getenv("SMTP_FROM_EMAIL") or username

        return {
            "host": host,
            "port": port,
            "username": username,
            "password": password,
            "from_email": from_email,
        }

    @classmethod
    def send_otp_email(
        cls,
        recipient_email: str,
        otp_code: str,
        recipient_name: Optional[str] = None,
    ) -> None:
        """
        Send a 6-digit email OTP for registration verification.
        Raises ServiceUnavailableError if SMTP is unconfigured or delivery fails.
        NEVER logs the OTP code, password, or credentials.
        """
        cfg = cls.get_smtp_config()
        if not cfg["username"] or not cfg["password"]:
            if current_app:
                current_app.logger.error(
                    "SMTP email delivery requested, but SMTP_USERNAME or SMTP_PASSWORD is not configured."
                )
            raise ServiceUnavailableError(
                message="Email delivery service is not configured. Missing SMTP credentials."
            )

        name_display = (recipient_name or "").strip() or "Student"
        from_address = cfg["from_email"] or cfg["username"]
        from_header = f"ExamMate AI <{from_address}>"
        subject = f"{otp_code} is your ExamMate AI verification code"

        # Plain text body
        text_body = (
            f"Hello {name_display},\n\n"
            f"Your verification code for ExamMate AI is: {otp_code}\n\n"
            f"This code will expire in 10 minutes.\n"
            f"If you did not request this verification, please ignore this email.\n\n"
            f"— The ExamMate AI Team"
        )

        # Branded responsive HTML body
        html_body = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ExamMate AI Verification Code</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #4f46e5; padding: 28px 32px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">🎓 ExamMate AI</h1>
      <p style="color: #e0e7ff; margin: 6px 0 0 0; font-size: 14px;">Tech Career &amp; Placement Preparation Platform</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #0f172a; font-weight: 700;">Confirm your email address</h2>
      <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
        Hello <strong>{name_display}</strong>,<br>
        Thank you for registering on ExamMate AI. Enter the verification code below to verify your email and activate your account:
      </p>
      <div style="background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #4f46e5; display: inline-block;">
          {otp_code}
        </span>
      </div>
      <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
        ⏱️ This code is valid for <strong>10 minutes</strong> and can only be used once.
      </p>
      <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
        🔒 <em>Security reminder: Never share this code with anyone. ExamMate AI staff will never ask for your code.</em>
      </p>
      <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        If you did not attempt to sign up for ExamMate AI, please disregard this email.
      </p>
    </div>
  </div>
</body>
</html>"""

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = from_header
        msg["To"] = recipient_email
        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        host = cfg["host"]
        port = cfg["port"]
        username = (cfg["username"] or "").strip()
        # Google App Passwords are 16 letters, often copied with spaces like 'abcd efgh ijkl mnop'
        password = (cfg["password"] or "").replace(" ", "").strip()

        try:
            if port == 465:
                with smtplib.SMTP_SSL(host, port, timeout=15) as server:
                    server.login(username, password)
                    server.send_message(msg)
            else:
                with smtplib.SMTP(host, port, timeout=15) as server:
                    server.ehlo()
                    server.starttls()
                    server.ehlo()
                    server.login(username, password)
                    server.send_message(msg)
        except Exception as exc:
            if current_app:
                current_app.logger.error(
                    "SMTP delivery failed for recipient %s: %s",
                    recipient_email,
                    type(exc).__name__,
                )
            raise ServiceUnavailableError(
                message="Failed to send verification email. Please check SMTP settings or try again later."
            )
