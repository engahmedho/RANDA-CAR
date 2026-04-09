@echo off
setlocal

cd /d "%~dp0"

echo [1/4] Checking Node.js...
where node >nul 2>&1 || (
  echo ERROR: Node.js is not installed or not in PATH.
  pause
  exit /b 1
)

echo [2/4] Installing Node dependencies...
call npm install --include=dev
if errorlevel 1 (
  echo ERROR: npm install failed.
  pause
  exit /b 1
)

echo [3/4] Installing Python dependencies...
where python >nul 2>&1 || (
  echo ERROR: Python is not installed or not in PATH.
  pause
  exit /b 1
)
call python -m pip install --upgrade pip setuptools wheel
call pip install -r server\requirements.txt
if errorlevel 1 (
  echo ERROR: Python dependencies install failed.
  pause
  exit /b 1
)

echo [4/4] Starting local dev server...
start "Car Price Predictor Dev" cmd /k "cd /d %~dp0 && npm run dev"

timeout /t 4 /nobreak >nul
start "" "http://localhost:5173"

echo App started. Browser opened at http://localhost:5173
echo You can close this window.
endlocal
exit /b 0
