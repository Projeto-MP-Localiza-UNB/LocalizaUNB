@echo off

echo Instalando dependencias do cliente...
cd client
npm install
cd ..

echo.
echo Instalando dependencias do servidor...
cd server
npm install
cd ..

echo.
echo Todas as dependencias foram instaladas com sucesso!
