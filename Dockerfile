FROM node:20 AS build

WORKDIR /app

RUN npm install -g @angular/cli@15

COPY package*.json ./

RUN npm install
COPY . .

# Ensure correct build configuration and output directory
RUN ng build --configuration production --output-path=dist/lissi-front
RUN ls -al /app/dist/lissi-front

FROM nginx:alpine
COPY --from=build /app/dist/lissi-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]