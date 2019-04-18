#!/bin/sh

echo "Start Express Server"

cd /app 
# install dependencies
npm i
# start the server
npm start


# run test
# open the second terminal
# run `docker-compose exec webapp npm run test`

# in home ubuntu 
# run id -u and id -g to get current user's userId and groupId and then uncomment docker compose file's user section