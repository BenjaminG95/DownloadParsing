FROM apify/actor-node:16

COPY package*.json ./

RUN apk add poppler-utils

RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional

COPY . ./