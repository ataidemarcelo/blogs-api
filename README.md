# Projeto Blogs API

## O que foi desenvolvido

  Neste projeto foi desenvolvido uma API e um banco de dados de conteúdo para um blog! 

  Uma aplicação em `Node.js` usando o ORM `Sequelize` para fazer um `CRUD` de posts.

  0. Foi utilizado o Docker, para o desenvolvimento.

  1. Foi desenvolvido endpoints que estão conectados ao banco de dados seguindo os princípios do REST;

  2. Foi desenvolvido uma camada de autenticação de pessoas usuárias.

  3. E também foi criado o relacionamento de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

#### Preview:

- Rodando as Migrations e Seeds.
- Criação de usuário, através de um endpoint.
- Login na aplicação.
- Listando usuários, somente com token JWT.

![Screenshot - preview](./blogs_api.gif)

> Obs: Já foi implementada a cryptografia da senha. :p 

## Habilidades trabalhadas:

- Criar uma aplicação usando o Docker para o desenvolvimento.

- Montar uma API e um banco de dados, seguindo boas práticas de desenvolvimento de software!

- Criar e associar tabelas usando um ORM.

- Criar endpoints para manipular as informações de um banco de dados MySQL.

- Autenticar pessoas usuárias através do JWT.

- Colocar sob nova ótica o jeito programar. Foi necessário, a todo momento, pensar “será que essa é a melhor forma de fazer isso?” ;)

### O que foi avaliado?

- Aderência do código à especificação. O programa deve se comportar como especificado.

- Respeitar os princípios de uma API REST

- Com a ajuda do Sequelize, criar as relaçẽos entre as entidades, seguindo um modelo DER.

- Ter uma autenticação em JWT.

- Organização do código.

---

## Rodando no Docker vs Localmente
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo.**


  > :information_source: Rode os serviços do `node` e o `db` com o comando `docker-compose up -d`.

  - Lembre-se o `mysql` tem que estar rodadno localmente na porta padrão (`3306`).

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container node `blogs_api` via CLI:

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm run dev, npm run db:reset, npm run db:seed:all, ...) devem ser executados **DENTRO** do container.

  > :information_source: Crie o DB e rode as migrations com `npm run db:reset`

  > :information_source: Popule o DB com  `npm run db:seed:all`

  > :information_source: Rode a aplicação em modo dev(nodemon) com `npm run dev`

  <br />

  ## 👉 Sem Docker

  - **:warning: Atenção:** Você vai precisar ter o MySQL instalado e rodando no seu PC.

  > :information_source: Instale as dependências com `npm install`

  > :information_source: Crie o DB e rode as migrations com `npm run db:reset`

  > :information_source: Popule o DB com  `npm run db:seed:all`

  > :information_source: Rode a aplicação em modo dev(nodemon) com `npm run dev`
  
  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  <br/>

  > Obs: Se você optar em usar a extenção do VSCode `Thunder Client`, use o arquivo `thunder-collection_Blogs_api.json` para importar a collection Blog Api

---
---

## 🎲 Diagrama:

  #### Diagrama de Entidade-Relacionamento

  A construção das tabelas foi orientada pelo *DER* a seguir usando o Sequelize ORM:

  ![DER](./public/der.png)

<details><summary>Saiba mais:</summary>

## Modelo de Banco de Dados Relacional para Sistema de Blog

O esquema apresentado na imagem descreve as tabelas de um banco de dados e suas relações em um sistema de blog.

### Tabelas e Campos

#### Categorias (`categories`)
- `id INT`: Chave primária que identifica cada categoria de forma única.
- `name VARCHAR(255)`: Nome da categoria.

#### Posts de Categorias (`posts_categories`)
- `post_id INT`: Chave estrangeira que referencia o `id` dos `blog_posts`.
- `category_id INT`: Chave estrangeira que referencia o `id` das `categories`.

#### Posts do Blog (`blog_posts`)
- `id INT`: Chave primária que identifica cada post do blog.
- `title VARCHAR(255)`: Título do post.
- `content VARCHAR(255)`: Conteúdo do post.
- `user_id INT`: Chave estrangeira que referencia o `id` do autor na tabela `users`.
- `published DATETIME`: Data e hora de publicação do post.
- `updated DATETIME`: Data e hora da última atualização do post.

#### Usuários (`users`)
- `id INT`: Chave primária que identifica cada usuário.
- `display_name VARCHAR(255)`: Nome que é exibido no blog.
- `email VARCHAR(255)`: E-mail do usuário.
- `password VARCHAR(255)`: Senha do usuário.
- `image VARCHAR(255)`: Caminho ou link para a imagem de perfil do usuário.

### Relacionamentos

- **Um-para-Muitos**: Entre `users` e `blog_posts`, indicando que um usuário pode escrever vários posts.
- **Muitos-para-Muitos**: Entre `blog_posts` e `categories`, facilitado pela tabela `posts_categories`, significando que um post pode ter várias categorias e uma categoria pode incluir vários posts.


</details>

---
---

### Blog API - Documentação de Endpoints

#### Saiba mais:

#### Healthy:

<details><summary>GET /status</summary>

### 👉 Método: **GET** _`/status`_

- **Objetivo:** Uma rota /status é comumente usada para verificar a saúde de uma API. Quando os clientes acessam essa rota, o servidor pode responder com informações sobre o status do serviço, se ele está funcionando corretamente ou se há algum problema. É uma maneira útil de monitorar a integridade da sua API.
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**
  ```json
  {
    "message": "[Healthy] - API on!!!"
  }
  ```
</details>

---

#### Authentication:

<details><summary>GET /login</summary>

### 👉 Método: **GET** _`/login`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `400 - BAD_REQUEST` -> se o campo 'email' ou 'password' forem inválidos ou não cadastrados
1. `401 - UNAUTHORIZED` -> se o campo 'email' não estiver cadastrado
2. `404 - NOT_FOUND` -> se a rota na API não existir
2. `500 - INTERNAL_SERVER_ERROR` -> se der outro erro
</details>

#### Cenário de Sucesso:

- **Objetivo:** Autenticar um usuário, já criado anteriormente, na aplicação
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**
  ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MywibmFtZSI6Ik1hcmNlbG8gQXRhw61kZSIsImF2YXRhciI6Imh0dHA6Ly90ZXN0ZSJ9LCJpYXQiOjE3MDI5ODgyOTgsImV4cCI6MTcwMjk4OTE5OH0.CrIXONvWKLD98NndrLSDmEQNmuoO1zM_2ur6msF17hY"
    }
  ```
  
</details>

---

#### Users:

<details><summary>GET /user</summary>

### 👉 Método: **GET** _`/user`_

<details><summary><strong>Cenários de Exceção:</strong></summary>

1. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
2. `404 - NOT_FOUND` -> se a rota na API não existir
2. `500 - INTERNAL_SERVER_ERROR` -> se der erro ao tentar listar os usuários
</details>

#### Cenário de Sucesso:

- **Objetivo:** Listar todos os usuários da aplicação
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**

  ```json
  [
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    {
      "id": 2,
      "displayName": "Michael Schumacher",
      "email": "MichaelSchumacher@gmail.com",
      "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
    }
  ]
  ```

</details>

---
<details><summary>GET /user/{id}</summary>

### 👉 Método: **GET** _`/user/{id}`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `404 - NOT_FOUND` -> se o usuário com o ID especificado não for encontrado
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar recuperar o usuário.
</details>

#### Cenário de Sucesso:

- **Objetivo:** Recuperar informações de um usuário específico através do seu ID.
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**

  ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
  ```

</details>

---
<details><summary>POST /user</summary>

### 👉 Método: **POST** _`/user`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `400 - BAD_REQUEST` -> se os campos forem inválidos
1. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
2. `404 - NOT_FOUND` -> se a rota na API não existir
3. `409 - CONFLICT` -> se o usuário já existir
4. `500 - INTERNAL_SERVER_ERROR` -> se der erro ao tentar listar os usuários
</details>

#### Cenário de Sucesso:

- **Objetivo:** Listar todos os usuários da aplicação
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**

  ```json
    [
      {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      {
        "id": 2,
        "displayName": "Michael Schumacher",
        "email": "MichaelSchumacher@gmail.com",
        "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
      }
    ]
  ```

</details>

---
</details>

<details><summary>DELETE /user</summary>

### 👉 Método: **DELETE** _`/user/me`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar deletar o post
</details>

#### Cenário de Sucesso:

- **Objetivo:** Permitir que o usuário logado delete sua própria conta.
- **Código HTTP (sucesso):** `204 - No Content`

- **Nota:** Não há output para este método, pois a resposta bem-sucedida é um status HTTP `204 - NO_CONTENT`.
</details>

---
#### Categories:
<details><summary>GET /categories</summary>

### 👉 Método: **GET** _`/categories`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar listar as categorias
</details>

#### Cenário de Sucesso:

- **Objetivo:** Listar todas as categorias de posts disponíveis na aplicação.
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**
  ```json
    [
      {
        "id": 1,
        "name": "Inovação"
      },
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  ```

</details>

---
<details><summary>POST /categories</summary>

### 👉 Método: **POST** _`/categories`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `400 - BAD_REQUEST` -> se o campo 'name' não for fornecido ou for menor que 5 caracteres
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar criar a categoria
</details>

#### Cenário de Sucesso:

- **Objetivo:** Criar uma nova categoria de posts.
- **Código HTTP (sucesso):** `201 - CREATED`

- **Input (exemplo):**
  ```json
    {
      "name": "Nova categoria"
    }
  ```

</details>

---
#### Post:

<details><summary>GET /post</summary>

### 👉 Método: **GET** _`/post`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar listar os posts.
</details>

#### Cenário de Sucesso:
- **Objetivo:** Listar todos os posts criados, incluindo informações sobre suas categorias e o usuário que os criou.
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**
  ```json
  [
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2022-08-01T19:58:00.000Z",
      "updated": "2022-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação",
          "PostCategory": {
            "postId": 1,
            "categoryId": 1
          }
        }
      ]
    },
    {
      "id": 2,
      "title": "Vamos que vamos",
      "content": "Foguete não tem ré",
      "userId": 1,
      "published": "2022-08-01T19:58:00.000Z",
      "updated": "2022-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 2,
          "name": "Escola",
          "PostCategory": {
            "postId": 2,
            "categoryId": 2
          }
        }
      ]
    }
  ]
  ```

</details>

---
<details><summary>GET /post/search</summary>

### 👉 Método: **GET** _`/post/search`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `404 - NOT_FOUND` -> se nenhum post corresponder ao termo de pesquisa
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro durante a busca.
</details>

#### Cenário de Sucesso:

- **Objetivo:** Listar todos os posts que contenham em seu título ou conteúdo a palavra pesquisada.
- **Código HTTP (sucesso):** `200 - OK`

- **Exemplo de uso da query:**
  - URL: `http://localhost:3000/post/search?q=foguete`

- **Output (exemplo):**
  ```json
  [
    {
      "id": 2,
      "title": "Vamos que vamos",
      "content": "Foguete não tem ré",
      "userId": 1,
      "published": "2022-08-01T19:58:00.000Z",
      "updated": "2022-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 2,
          "name": "Escola",
          "PostCategory": {
            "postId": 2,
            "categoryId": 2
          }
        }
      ]
    }
  ]
  ```

</details>

---
<details><summary>GET /post/{id}</summary>

### 👉 Método: **GET** _`/post/{id}`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `404 - NOT_FOUND` -> se o post com o ID especificado não for encontrado
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar recuperar o post
</details>

#### Cenário de Sucesso:

- **Objetivo:** Recuperar informações de um post específico através do seu ID.
- **Código HTTP (sucesso):** `200 - OK`

- **Output (exemplo):**

  ```json
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2022-08-01T19:58:00.000Z",
    "updated": "2022-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação",
        "PostCategory": {
          "postId": 1,
          "categoryId": 1
        }
      }
    ]
  }
  ```

</details>

---
<details><summary>POST /post</summary>

### 👉 Método: **POST** _`/post`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
1. `400 - BAD_REQUEST` -> se algum dos campos obrigatórios não for fornecido ou não atender aos requisitos mínimos
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar criar o post
</details>

#### Cenário de Sucesso:

- **Objetivo:** Criar um novo post.
- **Código HTTP (sucesso):** `201 - CREATED`

- **Input (exemplo):**

  ```json
  {
    "title": "Título um",
    "content": "conteúdo um",
    "categoryIds": [2, 3]
  }
  ```

- **Output (exemplo):**

  ```json
  {
    "id": 3,
    "title": "Título um",
    "content": "conteúdo um",
    "userId": 3,
    "updated": "2023-12-20T12:07:57.044Z",
    "published": "2023-12-20T12:07:57.044Z"
  }
  ```
  
</details>

---
<details><summary>PUT /post/{id}</summary>

### 👉 Método: **PUT** _`/post/{id}`_

<details>
  <summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se não encontrar o token ou for inválido ou expirado.
0. `401 - UNAUTHORIZED` -> se o post não for do usuário que esta logado.
1. `404 - NOT_FOUND` -> se o post com o ID especificado não for encontrado 
2. `400 - BAD_REQUEST` -> se algum dos campos obrigatórios não for fornecido ou não atender aos requisitos mínimos 
3. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar atualizar o post 
</details>

#### Cenário de Sucesso:

- **Objetivo:** Atualizar um post específico através do seu ID, somente se o usuário for o dono do post.
- **Código HTTP (sucesso):** `200 - OK`

- **Input (exemplo):**

  ```json
  {
    "title": "Título Novo 2",
    "content": "Conteúdo novo 2"
  }
  ```


- **Output (exemplo):**

  ```json
    {
      "id": 3,
      "title": "Título Novo 2",
      "content": "Conteúdo novo 2",
      "userId": 3,
      "published": "2023-12-20T12:07:57.000Z",
      "updated": "2023-12-20T12:07:57.000Z",
      "user": {
        "id": 3,
        "displayName": "Marcelo Ataíde",
        "email": "marcelo@email.com",
        "image": "http://teste"
      },
      "categories": [
        {
          "id": 2,
          "name": "Escola",
          "PostCategory": {
            "postId": 3,
            "categoryId": 2
          }
        },
        {
          "id": 3,
          "name": "Nova categoria",
          "PostCategory": {
            "postId": 3,
            "categoryId": 3
          }
        }
      ]
    }
  ```

</details>

---
<details><summary>DELETE /post/{id}</summary>

### 👉 Método: **DELETE** _`/post/{id}`_

<details><summary><strong>Cenários de Exceção:</strong></summary>

0. `401 - UNAUTHORIZED` -> se o usuário tentando deletar o post não for o dono dele 
1. `404 - NOT_FOUND` -> se o post com o ID especificado não for encontrado 
2. `500 - INTERNAL_SERVER_ERROR` -> se ocorrer um erro ao tentar deletar o post
</details>

#### Cenário de Sucesso:

- **Objetivo:** Deletar um post específico, sendo permitido apenas se o usuário for o dono do post.
- **Código HTTP (sucesso):** `204 - NO_CONTENT`

- **Nota:** Não há output para este método, pois a resposta bem-sucedida é um status HTTP `204 - NO_CONTENT`.

</details>

#### Próximos passos:

- Criptografar a senha antes de salvar o usuário no banco. ✅
- Fazer os teste de unidade e de integração.
