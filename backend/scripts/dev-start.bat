@echo off
setlocal

echo Starting local docker compose...

where docker >nul 2>&1
if errorlevel 1 (
    echo not found docker command.
    exit /b 1
)

set "SCRIPT_DIR=%~dp0"
set "WORK_DIR=%SCRIPT_DIR%.."

for %%I in ("%WORK_DIR%") do set "WORK_DIR=%%~fI"

set "ROOT_DIR=%WORK_DIR%\.."

for %%I in ("%ROOT_DIR%") do set "ROOT_DIR=%%~fI"

echo ROOT_DIR: %ROOT_DIR%
echo WORK_DIR: %WORK_DIR%
echo SCRIPT_DIR: %SCRIPT_DIR%

set "COMPOSE_FILE=%WORK_DIR%\docker\docker-compose.yml"

echo docker compose file: %COMPOSE_FILE%

if not exist "%COMPOSE_FILE%" (
    echo not found docker compose file: %COMPOSE_FILE%
    exit /b 1
)

docker compose -f "%COMPOSE_FILE%" up -d --wait postgres redis
if errorlevel 1 (
    echo failed to start docker services.
    exit /b 1
)

call "%WORK_DIR%\gradlew.bat" setupGitHooks
if errorlevel 1 (
    echo failed to setup git hooks.
    exit /b 1
)

echo All services are ready!

endlocal