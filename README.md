# Modjo API Technical Assessment

## Mission

Develop an API that allows Modjo customers to access their calls metadata, transcripts, and summaries.

## Solution

This API is built using [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/). It uses a [PostgreSQL](https://www.postgresql.org/) database to store calls data and provides a comprehensive API documentation with [Swagger](https://docs.nestjs.com/openapi/introduction/).

## Prerequisites

- Node.js and npm installed
- Docker installed

### Setup and running instructions

#### 1. Prepare the environment file

- Create a new `.env` file by copying the provided `.env.example` file and update the database URL as needed.

```bash
cp .env.example .env
# Edit the .env file to set your DATABASE_URL
```

#### 2. Start the Database

```bash
docker compose up
```

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Generate Prisma Client

Generate the Prisma client to interact with the database:

```bash
npx prisma generate
```

#### 5. Create the database Schema

Apply database migrations to create the necessary schema:

```bash
npx prisma migrate dev
```

#### 5. See the database

Seed the database with some initial data:

```bash
npx prisma db seed
```

#### 6. Start the Backend

```bash
npm run start:dev
```

The backend will be available at: [http://localhost:3000/](http://localhost:3000/) (unless configured otherwise).

Swagger documentation can be accessed at: [http://localhost:3000/api](http://localhost:3000/api) (unless configured otherwise).

### Testing the API

To test the API, you can use Swagger and follow these steps:

1. **Retrieve All Calls**

   Make a request to `GET /calls` to get a list of calls. Each call will have an `id`.

2. **Retrieve Call Details**

   Use a call `id` from the previous step to fetch detailed information about that call, including optional transcript and summary data by making a request to `GET /calls/:id?includeTranscript=true&includeSummary=true`.
