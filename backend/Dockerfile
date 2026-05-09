FROM node:20-alpine
#alpine linux is used to smaller size - faster downloads and 
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
