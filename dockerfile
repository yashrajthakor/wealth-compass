FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN NITRO_PRESET=node-server npm run build
RUN ls -la .output/ && ls -la .output/server/ 2>/dev/null || echo "NO SERVER DIR" && find .output -name "*.mjs" -o -name "*.js" | head -50

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

RUN npm install --omit-dev

EXPOSE 3000

CMD ["npm", "run", "start"]