# Use a imagem Node.js 16.14 no Alpine Linux
FROM node:16.14-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /app-backend

# Copie o arquivo package.json para o contêiner
COPY package.json .

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante dos arquivos do aplicativo para o contêiner
COPY . .

# Exponha a porta 3001, que é a porta em que seu aplicativo estará ouvindo
EXPOSE 3001

# Aguarde até que o MySQL esteja disponível antes de iniciar o aplicativo
CMD while ! nc -z shopper 3306; do sleep 1; done && npm run reset
