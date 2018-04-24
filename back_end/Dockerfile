# base image
FROM node:latest

# set working directory
RUN mkdir /usr/src/back_end
WORKDIR /usr/src/back_end

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/back_end/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/back_end/
RUN npm install --silent

RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O && chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "mongo:27017", "--", "npm", "start"]
EXPOSE 8000