@echo off

echo.
echo Building Python...

:: Generate Python virtual environment
echo Generating Python virtual environment...
python -m venv .venv
echo Activating Python virtual environment...
call .venv\Scripts\activate.bat

echo Installing %PROJECT_NAME% Python dependencies...
pushd %PROJECT_NAME%\code\backend
python -m pip install -q -r requirements.txt
popd

:: Export Python dependencies
echo Export %PROJECT_NAME% Python dependencies - generating requirements.txt file...
python -m pip freeze > output\resources\python_requirements\requirements.txt

:: Generate and copy Django static files
echo Generate and copy Django static files
python %PROJECT_NAME%\code\backend\pillCenter_Backend\manage.py collectstatic --no-input --clear
xcopy %PROJECT_NAME%\code\backend\pillCenter_Backend\static output\%PROJECT_NAME%\static\static\ /eqv

echo Deactivating Python virtual environment...
call deactivate

echo Python cleanup...
if exist ".venv" rd /S /Q .venv

exit /B 1
