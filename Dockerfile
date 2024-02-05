FROM node:latest
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY index.js ./
USER root
COPY --chown=root:root . .
RUN npm install
CMD [ "node", "index.js" ]
