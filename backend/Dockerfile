FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and .env file
COPY . .

# Download wait-for script and install necessary tools
RUN apk add --no-cache wget

ADD https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

# Set environment variables from .env file
ENV $(cat .env | xargs)

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the application with MongoDB connection check
CMD ["sh", "-c", "npm start"]