# Benchmark tests between Redis and files

This is a test benchmark to compare the speed of responses from an Express JS server reading the same data from a static file, and from an in-memory database (Redis).

## Run redis

Redis will run under docker, emulating as much as possible a remote service. To run it just do:

```sh
docker-compose up -d
```

## Run the server

The server will run with nodemon, not what is usually used in production, but it's good enough.
To start the server just run:

```sh
npm run start
```

## Run the tests

The tests will be run with Artillery.io, so please install it globally or run it with npx:

```sh
npx artillery run ./scenario/file-item.yml
```

## Scenarios

There are 4 scenarios for artillery in the `scenarios` folder, two for Redis, and two using file as a source, and each two is with a single item or a list of items.