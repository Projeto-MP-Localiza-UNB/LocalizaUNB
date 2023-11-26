echo off

rem Iniciar o servidor do cliente
cd client
start npm start

rem Aguardar alguns segundos para garantir que o servidor do cliente inicie completamente
timeout /t 10

rem Iniciar o servidor do backend
cd ../server
start node index.js