# Stage 1: Build the application
FROM node:20 as build-stage

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Lint the code
RUN npm run lint

# Build the application
RUN npm run deploy:production

# Set working directory
WORKDIR /app

# Stage 2: Serve the application
FROM nginx as production-stage
RUN mkdir /app

# Copy the built files from the previous stage
COPY --from=build-stage /app/dist /app

# Copy NGINX Conf
#COPY nginx.conf /etc/nginx/nginx.conf

# Open Access Permission
RUN chmod -R 755 /app

# Expose port
EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]