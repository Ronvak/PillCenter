SET RELEASE_DIR=..\releases
if not exist "%RELEASE_DIR%" md %RELEASE_DIR%

for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "fullstamp=%YYYY%%MM%%DD%_%HH%%Min%%Sec%"

set RELEASE_FOLDER_NAME=release_%fullstamp%_%PROJECT_NAME%
md %RELEASE_DIR%\%RELEASE_FOLDER_NAME%

SET BUILD_SCRIPTS_DIR=..\..\scripts\build-scripts
