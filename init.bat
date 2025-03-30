@echo off
setlocal
title Creando Estructura para ZPL Previewer Edge Extension

REM --- Configuración ---
set "projectName=ZPL_Previewer_Edge_Extension"

REM --- Creación de Carpetas y Archivos ---
echo Creando la estructura del proyecto: %projectName%

REM Crear directorio raíz (si no existe)
if not exist "%projectName%" (
    mkdir "%projectName%"
    echo Creado directorio: %projectName%
) else (
    echo Directorio %projectName% ya existe. Continuando...
)

REM Crear subdirectorios básicos
mkdir "%projectName%\images"
mkdir "%projectName%\scripts"
mkdir "%projectName%\css"
echo Creados subdirectorios: images, scripts, css

REM Crear archivos principales (vacíos)
echo. > "%projectName%\manifest.json"
echo. > "%projectName%\popup.html"
echo. > "%projectName%\scripts\popup.js"
echo. > "%projectName%\css\popup.css"
echo Creados archivos base: manifest.json, popup.html, scripts/popup.js, css/popup.css

REM Crear archivos de icono placeholder (vacíos)
echo. > "%projectName%\images\icon16.png"
echo. > "%projectName%\images\icon48.png"
echo. > "%projectName%\images\icon128.png"
echo Creados placeholders para iconos: icon16.png, icon48.png, icon128.png

echo.
echo ==============================================
echo Estructura del proyecto creada exitosamente!
echo Proyecto ubicado en: %cd%\%projectName%
echo ==============================================
echo.

endlocal
pause