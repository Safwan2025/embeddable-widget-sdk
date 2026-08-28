FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY packages/product-widget/package*.json packages/product-widget/
COPY examples/basic/package*.json examples/basic/
RUN npm install
COPY . .
RUN npm run build -w @portfolio/product-widget && npm run build -w widget-example
FROM nginx:1.27-alpine
COPY --from=build /app/examples/basic/dist /usr/share/nginx/html
EXPOSE 80
