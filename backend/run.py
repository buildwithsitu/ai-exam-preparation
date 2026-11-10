import os
from dotenv import load_dotenv
from app import create_app

# Load local environment variables from .env filedocker
load_dotenv()

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("FLASK_DEBUG", "True").lower() in ("true", "1", "t")

    print("\n" + "=" * 60)
    print(" 🚀 ExamMate AI Backend Server")
    print("=" * 60)
    print(f" ➜ Environment: {os.getenv('FLASK_ENV', 'development')}")
    print(f" ➜ Address:     http://{host}:{port}")
    print(f" ➜ Health Check: http://{host}:{port}/api/v1/health")
    print(f" ➜ Database:    {app.config.get('SQLALCHEMY_DATABASE_URI')}")
    print("=" * 60 + "\n")

    app.run(host=host, port=port, debug=debug)
