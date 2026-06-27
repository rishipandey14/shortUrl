FROM node:20

WORKDIR /app

# copy only package files first to leverage docker cache
COPY package*.json ./

RUN npm install -g nodemon && npm install

# copy the rest of the source
COPY . .

EXPOSE 8020

ENV NODE_ENV=development

CMD ["nodemon", "index.js"]
