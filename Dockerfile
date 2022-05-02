FROM apify/actor-node:16

COPY package*.json ./

RUN apk add poppler-utils
RUN apk add tesseract-ocr

RUN npm --quiet set progress=false \
 && npm install --only=prod --no-optional

COPY . ./