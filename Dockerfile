FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN chmod +x ./node_modules/.bin/nodemon

EXPOSE 3000

CMD ["npm", "start"]