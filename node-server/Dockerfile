# DEV ONLY
FROM node:11-alpine

WORKDIR /app

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]