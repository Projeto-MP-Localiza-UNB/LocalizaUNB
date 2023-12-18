echo off

rem Instala dependencias no server
cd server
start npm install

rem Aguarde
timeout /t 2

rem Instala dependencias no Cliente
cd ../client
start npm install
