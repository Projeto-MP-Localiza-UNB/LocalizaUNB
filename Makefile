# Os inicializadores .bat so funcionam no windows 

.PHONY: install-client start-client install-server start-server start-prisma

all: install-client start-client wait install-server start-server start-prisma

install-client:
	cd client && npm install

start-client:
	cd client && npm start &

wait:
	sleep 10

install-server:
	cd server && npm install

start-server:
	cd server && node index.js

start-prisma:
	cd server && npx prisma studio &