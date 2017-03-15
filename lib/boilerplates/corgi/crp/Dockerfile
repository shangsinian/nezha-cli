FROM node:6.7.0

RUN mkdir -p /var/nodejs

COPY package.tgz /var/nodejs
RUN tar -xvf /var/nodejs/package.tgz -C /var/nodejs
WORKDIR /var/nodejs

EXPOSE 7009

ENTRYPOINT ["node", "./bin/app.js"]
