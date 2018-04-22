FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /app
WORKDIR /app
COPY ./app ./

RUN npm install --silent

CMD ["npm", "run", "start"]
EXPOSE 3000