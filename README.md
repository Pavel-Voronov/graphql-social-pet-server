## Install Deps

```bash
npm i
```

## Prisma Setup

### Install Prisma

Setup [Prisma CLI](https://www.prisma.io/docs/1.21/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

```bash
npm i -g prisma
```

### Install Docker

Install Docker and start Prisma and the connected database by running the following command:

```bash
docker-compose up -d
```

### Deploy Prisma

To deploy the Prisma schema run:

```bash
prisma deploy
```

Playground of Prisma is available here: http://localhost:4466/  
Prisma Admin is available here: http://localhost:4466/_admin

## Start NestJS Server

Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

Run Nest Server in Production mode:

```bash
npm run start:prod
```

Playground for the NestJS Server is available here: http://localhost:3000/graphql

## Playground

Some queries and mutations are secured by an auth guard. You have to accuire a JWT token from `signUp` or `signIn`. Add the the auth token as followed to **HTTP HEADERS** in the playground and replace `YOUR_JWT_TOKEN` here:

```
{
  "Authorization" : "Bearer YOUR_JWT_TOKEN"
}
```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Docker

Nest serve is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your Nest server.

There is one thing to be mentioned. A library called bcrypt is used for password hashing in the nest server starter. However, the docker container keeped crashing and the problem was missing tools for compilationof [bcrypt](https://github.com/kelektiv/node.bcrypt.js). The [solution](https://stackoverflow.com/a/41847996) is to install these tools for bcrypt's compilation before `npm install`:

```Dockerfile
# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python
```

Now to build a Docker image of your own Nest server simply run:

```bash
# give your docker image a name
docker build -t <your username>/nest-prisma-server .
# for example
docker build -t nest-prisma-server .
```

After Docker build your docker image you are ready to start up a docker container running the nest server:

```bash
docker run -d -t -p 3000:3000 nest-prisma-server
```

Now open up [localhost:3000](http://localhost:3000) to verify that your nest server is running.

If you see an error like `request to http://localhost:4466/ failed, reason: connect ECONNREFUSED 127.0.0.1:4466` this is because Nest tries to access the Prisma server on `http://localhost:4466/`. In the case of a docker container localhost is the container itself.
Therefore, you have to open up [Prisma Service](./src/prisma/prisma.service.ts) `endpoint: 'http://localhost:4466',` and replace localhost with the IP address where the Prisma Server is executed.

## Update Schema

### Prisma - Database Schema

Update the Prisma schema `prisma/datamodel.prisma` and after that run the following two commands(second executed automatically for you):

```bash
prisma deploy
```

`prisma deploy` will update the database and for each deploy `prisma generate` is executed. This will generate the latest Prisma Client to access Prisma from your resolvers.

### NestJS - Api Schema

The [schema.graphql](./src/schema.graphql) is generated with [type-graphql](https://typegraphql.ml/). The schema is generated from the [models](./src/models/user.ts), the [resolvers](./src/resolvers/auth/auth.resolver.ts) and the [input](./src/resolvers/auth/dto/login.input.ts) classes.

You can use [class-validator](https://docs.nestjs.com/techniques/validation) to validate your inputs and arguments.
