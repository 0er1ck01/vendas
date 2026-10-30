@echo off
title Sistema de Vendas Protech
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\nodejs"
echo Iniciando o servidor de desenvolvimento Protech...
echo Acesse no navegador: http://localhost:5173
echo.
call npm run dev
pause

