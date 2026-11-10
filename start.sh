#!/usr/bin/env bash
# ExamMate AI - Full-Stack Local Launcher Script
# Starts Flask Backend (:5000) and React Vite Frontend (:5173) with automatic cleanup.

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cleanup() {
  echo ""
  echo "Stopping ExamMate AI services..."
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  exit 0
}

trap cleanup SIGINT SIGTERM EXIT

echo ""
echo "=========================================================="
echo "  🚀 Starting ExamMate AI Full-Stack Platform..."
echo "=========================================================="

# 1. Start Flask Backend if Python environment is ready
PYTHON_BIN=""
if [ -x "$DIR/backend/venv/bin/python3" ]; then
  PYTHON_BIN="$DIR/backend/venv/bin/python3"
elif [ -x "$DIR/.venv/bin/python3" ]; then
  PYTHON_BIN="$DIR/.venv/bin/python3"
elif command -v python3 &>/dev/null; then
  PYTHON_BIN="$(command -v python3)"
fi

if [ -n "$PYTHON_BIN" ] && "$PYTHON_BIN" -c "import flask" 2>/dev/null; then
  echo "  ➜ Launching Flask Backend on http://127.0.0.1:5000..."
  (cd "$DIR/backend" && "$PYTHON_BIN" run.py) > "$DIR/backend/backend.log" 2>&1 &
  BACKEND_PID=$!
  sleep 1
  echo "  ✔ Flask Backend active (PID: $BACKEND_PID | Log: backend/backend.log)"
else
  echo "  ⚠️  Flask not detected in Python. Backend will stay offline."
  echo "     Frontend will operate seamlessly in offline Demo student mode."
fi

echo "  ➜ Local Web App:     http://localhost:5173"
echo "  ➜ Backend API:       http://localhost:5000/api/v1/health"
echo "  ➜ Press Ctrl+C anytime to stop all services"
echo "=========================================================="
echo ""

# 2. Start Vite Frontend (stays in foreground)
cd "$DIR/frontend-react"
npm run dev -- --host 0.0.0.0 --port 5173
