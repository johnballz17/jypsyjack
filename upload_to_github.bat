@echo off
title Push JypsyJacksShack to GitHub
cd /d "%~dp0"

echo ==============================================================
echo           PUSHING JYPSYJACKSSHACK TO GITHUB
echo ==============================================================
echo.
echo Remote: https://github.com/johnballz17/jypsyjack.git
echo Branch: main
echo.
echo Pushing now... (Please wait while files upload)
echo.

git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================
    echo [SUCCESS] JypsyJacksShack has been uploaded to your GitHub repo!
    echo URL: https://github.com/johnballz17/jypsyjack
    echo ==============================================================
) else (
    echo.
    echo [!] Push encountered an issue. See message above.
)

echo.
pause
