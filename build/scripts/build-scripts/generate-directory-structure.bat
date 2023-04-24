@echo off

echo.
echo Creating output folder...

if not exist "output\%PROJECT_NAME%" md output\%PROJECT_NAME%

if not exist "output\resources\python_requirements" md output\resources\python_requirements

exit /B 1
