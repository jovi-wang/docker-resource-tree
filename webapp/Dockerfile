#DEV ONLY
FROM node:11-alpine

WORKDIR /app

# in prod version of docker file it has the following parts

# COPY package.json package.json
# RUN npm install && mv node_modules /node_modules
# COPY . .

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh