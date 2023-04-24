@echo off

echo.
echo Copying server files...
xcopy %PROJECT_NAME%\code\backend\pillCenter_Backend output\%PROJECT_NAME%\server\ /eqv
echo Copying env file for lab [%ENV_FILE%]...
copy %PROJECT_NAME%\build\env\%ENV_FILE% output\%PROJECT_NAME%\server\.env
exit /B 1
