FROM node:12-alpine
COPY . /mocker-xl
WORKDIR /mocker-xl
RUN npm install
EXPOSE 1988
CMD npm run start
