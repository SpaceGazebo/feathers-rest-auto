# Use the official lightweight Node.js 14-image.
# https://hub.docker.com/_/node
FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 5000

# Create and change to the app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json .
COPY yarn.lock .

# for fork of repo
RUN apk add --no-cache git

# Install production dependencies.
RUN yarn install --prod

RUN apk del git

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "src/" ]
