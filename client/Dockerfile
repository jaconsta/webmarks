from node:15.10

WORKDIR /app

ADD yarn.lock /app/yarn.lock
ADD package.json /app/package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

ADD . /app

EXPOSE 3000
EXPOSE 35729

# ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["yarn start"]
