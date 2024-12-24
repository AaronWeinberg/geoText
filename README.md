# mfsn

### deps

```sh
npm i -g pnpm # install pnpm globally

pnpm i # install node_modules without hoisting
```

### After installing with npm or pnpm, replace default values in ./packages/server/.env

### If on TMUX terminal, run the following startup script

```sh
./mfsn.sh
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
