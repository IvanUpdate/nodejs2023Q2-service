FROM node:18

WORKDIR /app

COPY package*.json /app/

COPY prisma ./prisma/ 

COPY .env ./.env

RUN npm install  && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prisma" ]
