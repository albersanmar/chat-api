echo "Obteniendo los ultimos cambios------------------------------------------------------------------------------------"
git pull

echo "Instalando librerias----------------------------------------------------------------------------------------------"
yarn install

echo "Compilando--------------------------------------------------------------------------------------------------------"
node ace build --production

echo "Intalando librerias del build-------------------------------------------------------------------------------------"
cd build
yarn install --production
cd ..

echo "Ejecutando migraciones de la base de datos------------------------------------------------------------------------"
node ace migration:run --force

echo "Ejecutando el servidor--------------------------------------------------------------------------------------------"
cp .env build
/home/marketing/.npm-global/bin/pm2 start ecosystem.config.js
# node build/server.js