@echo off

echo.
echo Cleaning up...
rd /S /Q "%PROJECT_NAME%"
del /F /Q *.*

exit /B 1
