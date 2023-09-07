FROM node:16-alpine3.11
WORKDIR /app
COPY package.json .
RUN npm install
COPY ./src ./src
COPY ./wait-for-it.sh ./wait-for-it.sh
CMD ["npm", "start"]