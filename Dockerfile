# Step 1: Build the Angular app using Node.js 20 and Angular CLI 15
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli@15 && npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application in production mode
RUN ng build --configuration production

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage to the Nginx web server's default directory
COPY --from=build /app/dist/lissi-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
