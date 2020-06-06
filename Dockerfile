FROM node:10-alpine

EXPOSE 3000

RUN npm i npm@latest -g && mkdir /opt/node_app

WORKDIR /opt/node_app/app

RUN chown -R node:node /opt/node_app

USER node

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

ENV PATH /opt/node_app/app/node_modules/.bin:$PATH

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]