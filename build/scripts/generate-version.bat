@echo off

call set-env.bat
call set-release-folder.bat

SET ENV_FILE=.env.%PROJECT_NAME%

pushd %RELEASE_DIR%\%RELEASE_FOLDER_NAME%

cmd /c %BUILD_SCRIPTS_DIR%\clone-project.bat
cmd /c %BUILD_SCRIPTS_DIR%\generate-directory-structure.bat
cmd /c %BUILD_SCRIPTS_DIR%\generate-virtual-env.bat
cmd /c %BUILD_SCRIPTS_DIR%\generate-frontend.bat
cmd /c %BUILD_SCRIPTS_DIR%\generate-backend.bat
cmd /c %BUILD_SCRIPTS_DIR%\cleanup.bat

popd

exit /B 1
