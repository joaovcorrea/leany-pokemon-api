# Leany Pokémon API

API para o desafio técnico da vaga de **Desenvolvedor Backend Júnior** na Leany.

Gerencia **Treinadores**, **Times** e **Pokémon**, buscando dados dos Pokémon na [PokéAPI](https://pokeapi.co/).

> **Não manja de NestJS?** Leia o **[GUIA_ESTUDO.md](./GUIA_ESTUDO.md)** — explica tudo em linguagem simples, com roteiro para o vídeo da Loom e perguntas de entrevista.

---

## O que este projeto faz?

Em resumo:

1. Você cadastra **treinadores** (nome, cidade)
2. Cada treinador pode ter **times**
3. Cada time pode ter até **6 Pokémon**
4. Os dados do Pokémon (nome, tipo, imagem) vêm da **PokéAPI** — só guardamos o ID no banco

---

## Tecnologias usadas

| Tecnologia | Para que serve |
|------------|----------------|
| NestJS | Framework da API |
| TypeORM | Comunicação com o banco |
| PostgreSQL | Banco de dados |
| Docker | Rodar o banco facilmente |
| Swagger | Documentação em `/docs` |
| class-validator | Validar dados de entrada |
| Axios | Chamar a PokéAPI |

---

## Como rodar

### Pré-requisitos

- Node.js 18+
- Docker Desktop instalado

### Passos

```bash
# 1. Clonar e entrar na pasta
git clone <url-do-repositorio>
cd leany-pokemon-api

# 2. Configurar ambiente
copy .env.example .env

# 3. Subir o banco de dados
docker compose up -d

# 4. Instalar e rodar
npm install
npm run start:dev
```

- **API:** http://localhost:3000
- **Swagger (testar endpoints):** http://localhost:3000/docs

---

## Endpoints

### Treinadores — `/trainers`

| Método | Rota | O que faz |
|--------|------|-----------|
| POST | `/trainers` | Criar treinador |
| GET | `/trainers` | Listar todos |
| GET | `/trainers/:id` | Buscar um |
| PATCH | `/trainers/:id` | Atualizar |
| DELETE | `/trainers/:id` | Remover |

### Times

| Método | Rota | O que faz |
|--------|------|-----------|
| POST | `/trainers/:trainerId/teams` | Criar time |
| GET | `/trainers/:trainerId/teams` | Listar times do treinador |
| GET | `/teams/:teamId` | Buscar time |
| PATCH | `/teams/:teamId` | Atualizar |
| DELETE | `/teams/:teamId` | Remover |

### Pokémon nos times — `/teams/:teamId/pokemons`

| Método | Rota | O que faz |
|--------|------|-----------|
| POST | `/teams/:teamId/pokemons` | Adicionar Pokémon |
| GET | `/teams/:teamId/pokemons` | Listar (com dados da PokéAPI) |
| DELETE | `/teams/:teamId/pokemons/:teamPokemonId` | Remover |

---

## Exemplo rápido (Swagger é mais fácil)

Se preferir linha de comando:

```bash
# Criar treinador
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d "{\"nome\": \"Ash Ketchum\", \"cidadeOrigem\": \"Pallet Town\"}"

# Criar time (troque TRAINER_ID pelo id retornado acima)
curl -X POST http://localhost:3000/trainers/TRAINER_ID/teams \
  -H "Content-Type: application/json" \
  -d "{\"nomeDoTime\": \"Time Elétrico\"}"

# Adicionar Pikachu (troque TEAM_ID)
curl -X POST http://localhost:3000/teams/TEAM_ID/pokemons \
  -H "Content-Type: application/json" \
  -d "{\"pokemonIdOuNome\": \"pikachu\"}"
```

---

## Arquitetura (resumo)

```
Requisição HTTP
      ↓
 Controller  →  recebe e valida
      ↓
  Service    →  regras de negócio
      ↓
 Repository  →  banco de dados
```

A PokéAPI tem um serviço separado (`PokeApiService`) para não misturar com a lógica do banco.

Detalhes completos no **[GUIA_ESTUDO.md](./GUIA_ESTUDO.md)**.

---

## Decisões do projeto

1. **PokéAPI isolada** — um serviço só para chamadas externas
2. **DTOs** — entidades do banco nunca vão direto na resposta
3. **Validação na adição** — consulta a PokéAPI antes de salvar
4. **Máximo 6 Pokémon** por time
5. **ID normalizado** — salva o número da PokéAPI (ex: `25`), não o nome
6. **Cascade delete** — apagar treinador apaga times e pokémons dele

---

## Vídeo explicativo (Loom)

> Cole aqui o link do seu vídeo. Use o roteiro do [GUIA_ESTUDO.md](./GUIA_ESTUDO.md#10-roteiro-sugerido-para-o-vídeo-loom-58-min).

---

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run start:dev` | Roda com hot reload |
| `npm run build` | Compila o projeto |
| `npm run start:prod` | Roda em produção |

---

## Autor

João Corrêa — [GitHub](https://github.com/joaovcorrea)
