# storySaver

### deps

```sh
npm i -g pnpm # install pnpm globally

pnpm i # install node_modules without hoisting
```

### After cloning, create ./packages/server/.env and populate it with the following:

```
DB=<Database>
DB_UN=<Database Username>
DB_PW=<Database Password>
DB_CLUSTER=<Database Cluster>
SERVER_PORT=<Server Port>
```

### If on TMUX terminal, run the following startup script and ignore subsequent directions

```sh
./storySaver.sh
```

### Otherwise, run:

### terminal 1

```sh
npm run watch # run tsc on all projects
```

### terminal 2

```sh
npm run server
```

### terminal 3

```sh
npm run client
```
