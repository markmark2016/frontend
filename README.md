## Init job

### Install nvm

[References](https://github.com/creationix/nvm)

### Install gulp & bower
```
nvm use node
npm install --global bower gulp
```

### Install dependences

```bash
nvm use node
cd <app root dir>
npm install
bower install
```

## Development

```bash
nvm use node
gulp serve 
```

## Build

```bash
nvm use node
gulp develop
gulp prod
```


