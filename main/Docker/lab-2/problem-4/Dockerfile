# extend base image of node
FROM node:10-alpine

# make dir app working dir
RUN mkdir -p /node/weather-app
WORKDIR /node/weather-app

# copy package content
COPY . ./

# run npm install 
RUN npm install

#add env of APP_VERSION
ENV APP_VERSION=latest

#add env of NODE_ENV
ENV NODE_ENV=production

#copy weather-app
RUN cp -r /node/weather-app  /var/weather-app

# make dir app working dir
WORKDIR /var/weather-app

# expose app
EXPOSE 3000

#enter point
ENTRYPOINT [ "./bin/www" ]

# run app
CMD "npm start"
