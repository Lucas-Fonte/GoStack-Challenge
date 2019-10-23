# GoStack-Challenge

Este é o desafio final para graduação do bootcamp Go-Stack da [Rocketseat](https://rocketseat.com.br/).

## Visuals

#### SignIn da aplicação.

![Meetapp](https://user-images.githubusercontent.com/53484547/67404562-f3bbb300-f589-11e9-88b2-43fe73df72c9.png "Meetapp Screenshot")

#### Dashboard da aplicação.

![Meetapp](https://user-images.githubusercontent.com/53484547/67404553-f1f1ef80-f589-11e9-810b-c19778ae4206.png "Meetapp Screenshot")

Exemplo de meetup organizado pelo usuário do browser, disponível para os usuários mobile. 

## Installation

Para inicializar o projeto
```
 bash
 git clone https://github.com/Lucas-Fonte/GoStack-Challenge.git
```
Ou faça o download do .zip do projeto.

Para o banco de dados, pode ser utilizado qualquer banco SQL, para este projeto foi utilizado **PostgreSQL**.

Caso possua o [Docker](https://docs.docker.com/docker-for-mac/install/), uma opção seria apenas criar um container do PostgreSQL. 


```
 Exemplo com credenciais padrão do projeto
 
 bash
 docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
Outra opção seria fazer o download direto do [postgres](https://www.postgresql.org/download/) e roda-lo com as mesmas credenciais.

Com o banco de dados configurado, basta criar uma *database* chamada 'meetapp', ou como optar por chama-lá, lembrando sempre de alterar a variável no arquivo **.env**.

*(Versão 11 utilizada, pois a versão 12 apresentou problemas ao introduzir as migrations)*

Use um package manager, [yarn](https://yarnpkg.com/en/docs/install#mac-stable) ou [npm](https://www.npmjs.com/get-npm) , para instalar as dependências.

```bash
cd backend
yarn
yarn sequelize db:migrate
yarn start
```

```bash
cd frontend
yarn 
yarn start
```

```bash
cd mobile
yarn 
yarn start
```
Tudo pronto, agora basta aproveitar a criação de meetups entre vários usuários.

## License
[MIT](https://choosealicense.com/licenses/mit/)
Rendered
Meetapp
Meetapp é uma aplicação full-stack para organização e inscrição de meetups, feita com NodeJS, ReactJS e React Native(iOS).

License
MIT
