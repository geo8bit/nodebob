@echo off
echo windows nodebob v0.1
echo ---

set CUR_DIR=%CD%
set EXE_PATH=%CUR_DIR%\release\app.exe
set ICO_PATH=%CUR_DIR%\app\app.ico
set NWEXE_PATH=%CUR_DIR%\buildTools\nw\nw.exe
set NWZIP_PATH=%CUR_DIR%\release\app.nw

if not exist release md release

echo Creating .nw file...
cd buildTools\7z
7z a -tzip %NWZIP_PATH% %CUR_DIR%\app\*
cd ..\..

echo Creating .exe file...
copy /b /y %NWEXE_PATH% %EXE_PATH%
cd buildTools\ar
Resourcer -op:upd -src:%EXE_PATH% -type:14 -name:IDR_MAINFRAME -file:%ICO_PATH%
copy /b /y %EXE_PATH% + %NWZIP_PATH% %EXE_PATH%
cd ..\..

echo Copying files...
if not exist %CUR_DIR%\release\ffmpegsumo.dll copy %CUR_DIR%\buildTools\nw\ffmpegsumo.dll %CUR_DIR%\release\ffmpegsumo.dll
if not exist %CUR_DIR%\release\icudt.dll copy %CUR_DIR%\buildTools\nw\icudt.dll %CUR_DIR%\release\icudt.dll
if not exist %CUR_DIR%\release\libEGL.dll copy %CUR_DIR%\buildTools\nw\libEGL.dll %CUR_DIR%\release\libEGL.dll
if not exist %CUR_DIR%\release\libGLESv2.dll copy %CUR_DIR%\buildTools\nw\libGLESv2.dll %CUR_DIR%\release\libGLESv2.dll
if not exist %CUR_DIR%\release\nw.pak copy %CUR_DIR%\buildTools\nw\nw.pak %CUR_DIR%\release\nw.pak

echo Deleting temporary files...
del %NWZIP_PATH%

echo Done!