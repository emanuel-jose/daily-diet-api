### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
      _As refeições devem ser relacionadas a um usuário._
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### Rotas:

**_Autenticação_**

- [POST]/users (Criação de usuário):
  Cria um novo usuário no banco e gera um token com o id do usuário e um session_id que expira em um determinado tempo, esse token é salvo nos cookies para autenticação futura. Verificar se email já existe no banco.
  Request:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

  Response:

  ```json
  {
    "token": "string"
  }
  ```

- New TODO: [POST]/login (Logar com um usuário existente):
  Loga na aplicação com um usuário exsitente no banco e guarda um token nos cookies assim como a rota de criação.
  Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "string"
}
```

- New TODO: [POST]/logout (Deslogar da aplicação):
  Desloga o usuário atual da sessão, removendo o token dos cookies

  Response:

  ```json
  {
    "message": "Logout successful"
  }
  ```

**_Meals_**

- [POST]/meals (Criação de uma nova refeição):
  Cria uma nova refeição para o usuário autenticado, pegando o id no token salvo nos cookies.
  Request:

  ```json
  {
    "name": "string",
    "description": "string",
    " ": "Timestamp",
    "is_within_diet": "boolean"
  }
  ```

  Response:

  ```json
  {
    "id": "UUID",
    "user_id": "UUID",
    "name": "string",
    "description": "string",
    "datetime": "Timestamp",
    "is_within_diet": "boolean",
    "created_at": "Timestamp"
  }
  ```

- [GET]/meals (Lista todas as refeições do usuário autenticado):
  Litas as refeições do usuário logado pegando o id no token salvo nos cookies.
  Response:

  ```json
  {
    "meals": [
      {
        "id": "UUID",
        "user_id": "UUID",
        "name": "string",
        "description": "string",
        "datetime": "Timestamp",
        "is_within_diet": "boolean",
        "created_at": "Timestamp",
        "updated_at": "Timestamp" // caso já tenha sido editada.
      }
    ]
  }
  ```

- [GET]/meals/:id (Retorna uma refeição especifica por id)
  Response:

  ```json
  {
    "meal": {
      "id": "UUID",
      "user_id": "UUID",
      "name": "string",
      "description": "string",
      "datetime": "Timestamp",
      "is_within_diet": "boolean",
      "created_at": "Timestamp",
      "updated_at": "Timestamp" // caso já tenha sido editada.
    }
  }
  ```

- [PUT]/meals/:id (Edita uma refeição pelo id)
  Request:

  ```json
  {
    "name": "string",
    "description": "string",
    "datetime": "Timestamp",
    "is_within_diet": "boolean"
  }
  ```

  Response:

  ```json
  {
    "id": "UUID",
    "user_id": "UUID",
    "name": "string",
    "description": "string",
    "datetime": "Timestamp",
    "is_within_diet": "boolean",
    "created_at": "Timestamp"
  }
  ```

- [DELETE]/meals/:id (Remove uma refeição pelo id)
  Response:

  ```json
  {
    "message": "Meal deleted successfully"
  }
  ```

**_Metric_**

- [GET]/metrics (Retorna as métricas do usuário):
  Pega o id do usuário nos cookies para gerar os dados das refeições do usuário autenticado.
  Response:

  ```json
  {
    "total_meals": "integer",
    "within_diet_meals": "integer",
    "out_of_diet_meals": "integer",
    "best_diet_streak": "integer"
  }
  ```
