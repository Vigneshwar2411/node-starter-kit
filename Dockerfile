FROM node:10-alpine as build

COPY . /cooper-react-node-starter-kit
WORKDIR /cooper-react-node-starter-kit

RUN rm -rf node_modules && npm install
RUN npm test
RUN npm run build:client

RUN mkdir -p /prod-app && \
    mkdir -p /prod-app/src && \
    mkdir -p /run
RUN cp -r package.json package-lock.json /prod-app && \
    cp -r server.js newrelic.js set_secrets.sh /prod-app && \
    cp -r env /prod-app/env && \
    cp -r env_vars /prod-app/env_vars && \
    cp -r views /prod-app/views && \
    cp -r public /prod-app/public && \
    cp -r src/app /prod-app/src/app

####################################

FROM testcafe/testcafe as integration
USER root

COPY --from=build /cooper-react-node-starter-kit /cooper-react-node-starter-kit
RUN chown -R user:user /cooper-react-node-starter-kit
USER user
WORKDIR /cooper-react-node-starter-kit

RUN npm run test:functional:ci

####################################

FROM node:10-alpine

COPY --from=build /prod-app /cooper-react-node-starter-kit

RUN apk add --update vim

WORKDIR /cooper-react-node-starter-kit
RUN rm -rf node_modules && \
    npm install --production

EXPOSE 3020
CMD . ./set_secrets.sh && npm start
