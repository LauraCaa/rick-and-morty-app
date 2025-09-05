FROM node:21
WORKDIR "/opt/rick-and-morty"
COPY . ./
COPY package*.json .
RUN npm i
EXPOSE "3000"
CMD ["sleep", "infinity"]