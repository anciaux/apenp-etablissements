# Stage 1
FROM node:8.11.2-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i npm@latest -g

RUN npm install

COPY . .

RUN npm audit fix

RUN npm run build

# Stage 2
FROM nginx:stable

COPY --from=node /usr/src/app/dist/angular-tour-of-heroes /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf