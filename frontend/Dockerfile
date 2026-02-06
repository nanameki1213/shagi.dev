FROM node:20-bullseye AS builder

WORKDIR /app

RUN yarn set version berry

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build

FROM builder AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
