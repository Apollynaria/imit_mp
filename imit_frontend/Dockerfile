FROM node:18

WORKDIR /nuxt

COPY package.json .

RUN npm install

COPY . /nuxt

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD npm run dev
