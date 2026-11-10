import os
import time
from datetime import datetime, timezone
from typing import Any, Dict, Tuple
from flask import current_app
from sqlalchemy import text
from app.extensions import db


class HealthService:
    """Service to evaluate server and database health status."""

    _start_time: float = time.time()

    @classmethod
    def get_uptime_seconds(cls) -> float:
        """Calculate server uptime in seconds."""
        return round(time.time() - cls._start_time, 2)

    @classmethod
    def check_database(cls) -> Tuple[bool, Dict[str, Any]]:
        """
        Execute a ping query against PostgreSQL / configured database
        and compute execution latency in milliseconds.
        """
        engine_name = "unknown"
        try:
            engine_name = db.engine.name
        except Exception:
            pass

        start_time = time.perf_counter()
        try:
            # Simple, fast connection verification query
            db.session.execute(text("SELECT 1"))
            latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
            
            pool_info: Dict[str, Any] = {}
            if hasattr(db.engine, "pool"):
                pool = db.engine.pool
                pool_info = {
                    "size": getattr(pool, "size", lambda: 0)(),
                    "checked_in": getattr(pool, "checkedin", lambda: 0)(),
                    "checked_out": getattr(pool, "checkedout", lambda: 0)(),
                }

            return True, {
                "status": "connected",
                "engine": engine_name,
                "latency_ms": latency_ms,
                "pool": pool_info,
            }
        except Exception as exc:
            latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
            return False, {
                "status": "disconnected",
                "engine": engine_name,
                "latency_ms": latency_ms,
                "error": str(exc),
            }

    @classmethod
    def get_health_report(cls) -> Tuple[Dict[str, Any], int]:
        """
        Generate complete health report.
        Returns (payload, status_code).
        Status is 200 when all services are healthy, 503 when critical services (DB) fail.
        """
        db_healthy, db_details = cls.check_database()

        overall_status = "healthy" if db_healthy else "unhealthy"
        http_code = 200 if db_healthy else 503

        env_name = "development"
        try:
            if current_app:
                env_name = current_app.config.get("ENV") or os.getenv("FLASK_ENV", "development")
            else:
                env_name = os.getenv("FLASK_ENV", "development")
        except RuntimeError:
            env_name = os.getenv("FLASK_ENV", "development")

        payload = {
            "success": db_healthy,
            "status": overall_status,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "environment": env_name,
            "version": os.getenv("APP_VERSION", "1.0.0"),
            "services": {
                "server": {
                    "status": "running",
                    "uptime_seconds": cls.get_uptime_seconds(),
                },
                "database": db_details,
            },
        }

        return payload, http_code
