FROM node:latest

WORKDIR /app/api

COPY ./package.json ./
RUN npm install
RUN npm run prisma

COPY . .
COPY ./.env.production ./.env

EXPOSE 3000

CMD ["npm", "start"]