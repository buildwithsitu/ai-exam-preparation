from flask import Blueprint, jsonify
from app.services.health_service import HealthService

health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health_check():
    """
    Verify server uptime and PostgreSQL database availability.
    Returns HTTP 200 when healthy, HTTP 503 when database is unavailable.
    """
    payload, status_code = HealthService.get_health_report()
    return jsonify(payload), status_code


@health_bp.route("/ping", methods=["GET"])
def ping():
    """Lightweight liveness probe for load balancers and orchestrators."""
    return jsonify({"status": "ok", "message": "pong"}), 200
