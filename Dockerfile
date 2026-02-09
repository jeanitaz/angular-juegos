# Parte 1 obtener el dist
FROM node:22 AS  builder 

WORKDIR /app

COPY  package.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Parte 2  Servidor ngix

FROM nginx:alpine-slim

COPY --from=builder /app/dist/videojuegos-angular/browser/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]




