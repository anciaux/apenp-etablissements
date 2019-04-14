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
RUN echo "deb http://ftp.debian.org/debian stretch-backports main" >> /etc/apt/sources.list
RUN apt-get update && apt install -y certbot python-certbot-nginx -t stretch-backports && apt clean && rm -rf /var/lib/apt/lists/*

COPY --from=node /usr/src/app/dist/angular-tour-of-heroes /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

