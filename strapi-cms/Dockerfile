FROM node:22-bullseye AS builder

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .

FROM builder
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
WORKDIR /opt/
COPY --from=builder /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=builder /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app /opt/node_modules

USER node
COPY --chown=node:node . .
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
