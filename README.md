# Hubot-BUDA

**Hubot script para mostrar el valor reciente de cripto-monedas desde Buda.com en pesos chilenos**

[![](https://img.shields.io/badge/huemul-approved-brightgreen.svg?style=flat-square)](http://www.devschile.cl/)
[![npm version](https://badge.fury.io/js/hubot-buda.svg)](https://www.npmjs.com/package/hubot-buda)
[![](https://circleci.com/gh/juanbrujo/hubot-buda.svg?style=shield)](https://circleci.com/gh/juanbrujo/hubot-buda)

**[NPM package](https://www.npmjs.com/package/hubot-buda)**

### Instalación:

````
$ npm install hubot-buda --save
````

Agregar en `external-scripts.json`:

````
[
  ..
  "hubot-buda"
]
````

### Uso:

````
hubot> buda bitcoin
````

````
hubot> buda ethereum
````

````
hubot> buda bitcoin-cash
````

**Ejemplo:**

````
hubot> hubot buda bitcoin

hubot> 1 bitcoin está a CLP$ 832.123 en BUDA
````

### Licencia:
[MIT](https://opensource.org/licenses/MIT)
