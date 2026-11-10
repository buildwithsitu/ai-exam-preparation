from functools import wraps
from typing import Any, Callable, Dict, List, Optional, Type
from flask import request
from app.utils.errors import BadRequestError, ValidationError


def validate_json(
    required_fields: Optional[List[str]] = None,
    field_types: Optional[Dict[str, Type]] = None,
    schema: Optional[Any] = None,
) -> Callable:
    """
    Decorator to validate incoming JSON request payloads.

    Args:
        required_fields: List of keys that must be present and not None.
        field_types: Mapping of field names to their expected Python types.
        schema: Optional Pydantic BaseModel class for deep schema validation.
    """
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                raise BadRequestError(
                    message="Invalid request: Content-Type must be application/json."
                )

            data = request.get_json(silent=True)
            if data is None:
                raise BadRequestError(message="Malformed JSON in request body.")

            errors: Dict[str, List[str]] = {}

            # 1. Pydantic schema validation if provided
            if schema is not None:
                try:
                    # Support Pydantic v2 and v1
                    if hasattr(schema, "model_validate"):
                        validated = schema.model_validate(data)
                    else:
                        validated = schema(**data)
                    # Pass validated object or dict to kwargs if needed
                    kwargs["validated_data"] = validated
                except Exception as err:
                    if hasattr(err, "errors"):
                        for err_item in err.errors():
                            field_name = ".".join(str(loc) for loc in err_item.get("loc", []))
                            msg = err_item.get("msg", "Invalid value")
                            errors.setdefault(field_name or "body", []).append(msg)
                    else:
                        errors.setdefault("body", []).append(str(err))

            # 2. Check required fields
            if required_fields:
                for field in required_fields:
                    if field not in data or data[field] is None or data[field] == "":
                        errors.setdefault(field, []).append("This field is required.")

            # 3. Check field types
            if field_types:
                for field, expected_type in field_types.items():
                    if field in data and data[field] is not None:
                        val = data[field]
                        if not isinstance(val, expected_type):
                            errors.setdefault(field, []).append(
                                f"Expected {expected_type.__name__}, got {type(val).__name__}."
                            )

            if errors:
                raise ValidationError(
                    message="Request payload validation failed.",
                    details=errors,
                )

            return f(*args, **kwargs)

        return decorated_function

    return decorator
