FROM node:18

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]
