FROM node:22.11-bullseye-slim as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN rm -rf node_modules
RUN yarn install
COPY . ./

ARG NODE_ENV
ARG CONF_ENV

ENV NODE_ENV=$NODE_ENV
ENV CONF_ENV=$CONF_ENV

RUN NODE_ENV=production yarn build-storybook
RUN rm -rf node_modules


FROM nginx:stable-alpine
COPY --from=build-deps /usr/src/app/storybook-static /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3010
CMD ["nginx", "-g", "daemon off;"]
