# Leany Pokémon API

API RESTful desenvolvida para o desafio técnico da vaga de **Desenvolvedor Backend Júnior** na Leany. A aplicação permite gerenciar Treinadores, Times e Pokémon, integrando-se com a [PokéAPI](https://pokeapi.co/) para validação e enriquecimento dos dados dos Pokémon.

## Tecnologias

- **NestJS** — framework principal
- **TypeORM** — ORM para persistência
- **PostgreSQL** — banco de dados relacional
- **Docker Compose** — ambiente do banco
- **Swagger** — documentação da API
- **class-validator / class-transformer** — validação de DTOs
- **Axios (@nestjs/axios)** — integração com a PokéAPI

## Arquitetura

A aplicação segue o padrão em camadas do NestJS:

```
src/
├── entities/           # Entidades do banco (não expostas na API)
├── trainers/           # Módulo de Treinadores (Controller → Service → Repository)
├── teams/              # Módulo de Times
├── team-pokemons/      # Módulo de Pokémon nos Times
└── poke-api/           # Serviço dedicado à integração com a PokéAPI
```

### Decisões de projeto

1. **PokeApiService isolado**: Toda comunicação com a PokéAPI fica centralizada em um serviço dedicado, facilitando manutenção e testes.
2. **DTOs para entrada e saída**: As entidades do TypeORM nunca são retornadas diretamente nos endpoints.
3. **Validação na adição de Pokémon**: Antes de persistir, o serviço consulta a PokéAPI para garantir que o Pokémon existe.
4. **Limite de 6 Pokémon por time**: Regra de negócio aplicada no `TeamPokemonsService`.
5. **Identificador normalizado**: Ao adicionar um Pokémon por nome (ex: `pikachu`), o ID numérico retornado pela PokéAPI é armazenado para consistência.
6. **Cascade delete**: Ao remover um Treinador, seus Times e Pokémon associados são removidos automaticamente.

### Modelo de dados

```
Treinador (1) ──→ (N) Time (1) ──→ (N) TeamPokemon ──→ PokéAPI (externo)
```

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- npm

## Como executar

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd leany-pokemon-api
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

### 3. Subir o banco de dados

```bash
docker compose up -d
```

### 4. Instalar dependências e rodar a API

```bash
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### 5. Acessar a documentação Swagger

Abra no navegador: **http://localhost:3000/docs**

## Endpoints principais

### Treinadores

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/trainers` | Criar treinador |
| GET | `/trainers` | Listar treinadores |
| GET | `/trainers/:id` | Buscar treinador |
| PATCH | `/trainers/:id` | Atualizar treinador |
| DELETE | `/trainers/:id` | Remover treinador |

### Times

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/trainers/:trainerId/teams` | Criar time para um treinador |
| GET | `/trainers/:trainerId/teams` | Listar times de um treinador |
| GET | `/teams/:teamId` | Buscar time |
| PATCH | `/teams/:teamId` | Atualizar time |
| DELETE | `/teams/:teamId` | Remover time |

### Pokémon dos Times

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/teams/:teamId/pokemons` | Adicionar Pokémon ao time |
| GET | `/teams/:teamId/pokemons` | Listar Pokémon do time (com dados da PokéAPI) |
| DELETE | `/teams/:teamId/pokemons/:teamPokemonId` | Remover Pokémon do time |

## Exemplo de uso

```bash
# 1. Criar treinador
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ash Ketchum", "cidadeOrigem": "Pallet Town"}'

# 2. Criar time (substitua TRAINER_ID)
curl -X POST http://localhost:3000/trainers/TRAINER_ID/teams \
  -H "Content-Type: application/json" \
  -d '{"nomeDoTime": "Time Elétrico"}'

# 3. Adicionar Pokémon (substitua TEAM_ID)
curl -X POST http://localhost:3000/teams/TEAM_ID/pokemons \
  -H "Content-Type: application/json" \
  -d '{"pokemonIdOuNome": "pikachu"}'

# 4. Listar Pokémon do time com detalhes da PokéAPI
curl http://localhost:3000/teams/TEAM_ID/pokemons
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start:dev` | Inicia em modo desenvolvimento com hot reload |
| `npm run build` | Compila o projeto |
| `npm run start:prod` | Inicia em produção |
| `npm run lint` | Executa o linter |
| `npm run test` | Executa testes unitários |

## Vídeo explicativo (Loom)

> Adicione aqui o link do seu vídeo no Loom explicando a solução, decisões de arquitetura e demonstração da API.

## Autor

Seu Nome — [GitHub](https://github.com/seu-usuario)
