echo off

rem Iniciar o servidor do cliente
cd client
call npm install
start npm start

@REM rem Aguardar alguns segundos para garantir que o servidor do cliente inicie completamente
timeout /t 10

rem Iniciar o servidor do backend
cd ../server
call npm install
start node index.js