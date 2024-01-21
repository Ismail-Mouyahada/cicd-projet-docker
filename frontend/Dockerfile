FROM node:21.2.0 as build
# Definir le nouveau chemin
WORKDIR /app

# Copies les fichiers de base     
COPY package*.json .

# Installer les dépendances
RUN npm install

# Copies les dépendances 
COPY . .

RUN npm run build-only


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]