FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli

COPY . ./

EXPOSE 3000

CMD ["sh"]
