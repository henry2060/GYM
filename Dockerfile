# ---- Base Node ----
FROM node:10
RUN mkdir /app
# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json /app
COPY ./dist /app

# install node packages
RUN npm install

# expose port and define CMD
EXPOSE 3000
CMD ["npm", "start"]