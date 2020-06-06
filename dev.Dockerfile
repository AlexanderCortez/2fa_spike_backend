FROM node:10.16

EXPOSE 3000

RUN mkdir -p /opt/node_app

WORKDIR /opt/node_app/

RUN chown -R node:node /opt/node_app

USER node

WORKDIR /opt/node_app/app
