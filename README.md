## Init job

### Install nvm

[References](https://github.com/creationix/nvm)

### Install grunt & bower
```
nvm use node
npm install --global bower grunt-cli
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
grunt serve 
```

## Build

```bash
nvm use node
grunt build
```


## fix
npm install karma
npm install grunt-karma
npm install grunt-contrib-imagemin@1.0.0 --save-dev
clean: options:{force:true},


