@ECHO OFF

where nmake > nul
IF %ERRORLEVEL% == 1 (
    call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
)
cmd /c %USERPROFILE%\bake\bake2.exe %*
)

