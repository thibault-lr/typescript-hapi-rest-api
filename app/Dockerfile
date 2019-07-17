FROM node:11.15.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN npm install yarn -g 
RUN yarn install

# copy source files
COPY ./ /usr/src/app

CMD ["yarn","prod"]
EXPOSE 3000