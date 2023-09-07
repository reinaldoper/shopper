# shopper
projeto teste técnico vaga fullStack
## Inicialmente fazer o clone do repositório:
`git clone git@github.com:reinaldoper/shopper.git`
`cd shopper`
# Back-end:
## Na raiz:
`npm install`
`Configurações do banco de dados dentro do arquivo .env`
`caso ja tenha o banco de dados rodando, alterar o arquivo .env e o model com as suas configurações`
## Rodar a API:
`npm run dev`
# Front-end:
## Na raiz:
`npm install`
## Rodar a aplicação:
`npm run dev` `clicar no link: http://localhost:3000/`
## Para escolher o arquivo .CSV clicar no botão:
`escolher arquivo`
## Converter arquivo .CSV em .JSON clicar no botão:
`Convert`
## Validar arquivo clicar no botão:
`VALIDAR`
## Caso arquivo selecionado atenda as regras de negócio, o botão ATUALIZAR estará disponivel:
`ATUALIZAR`
# Opção rodar pelo docker:
## Na raiz do projeto:
`docker-compose up -d`
`esse comando ira popular o banco de dados dentro do container através do script enviado anteriormente`
