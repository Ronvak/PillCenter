@echo off

echo.
echo Bundle %PROJECT_NAME% static content...
pushd %PROJECT_NAME%\code\frontend\pillcenter-frontend
cmd /c npm install
cmd /c npm run build

echo Copying %PROJECT_NAME% static content...
xcopy build ..\..\..\..\output\%PROJECT_NAME%\static\ /eqv
popd

exit /B 1
