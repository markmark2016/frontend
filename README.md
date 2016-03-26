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
cd <app root dir>
nvm use node
gulp dev
gulp wc
```

## Build

```bash
cd <app root dir>
nvm use node
gulp dev
gulp prod
```


