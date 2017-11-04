FROM node:8-alpine

RUN mkdir /app

WORKDIR /app

ADD ./ /app

RUN yarn install

EXPOSE 6001

CMD ["npm", "start"]
