FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production
ENV PATH=/usr/src/app/node_modules/.bin:$PATH


EXPOSE 3000
CMD [ "npm", "run", "watch" ]
