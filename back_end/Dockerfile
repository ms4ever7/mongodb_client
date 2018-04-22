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

CMD ["npm", "start"]
EXPOSE 8000