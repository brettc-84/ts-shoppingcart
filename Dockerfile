FROM node:12-alpine as BUILD
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:12-alpine as RUN
WORKDIR /app
COPY --from=BUILD /app/package*.json ./
COPY --from=BUILD /app/dist ./
RUN npm install --only=production

EXPOSE 3000
CMD ["node", "main.js"]
