# Getting started

Cette page va vous aidez étape par étape à mettre en place Kartel _(et Kart)_.

## Kartel

## Prérequis

### Node.js

Si tu utilises npm pour installer Kartel, il supporte :
:::tip
Pour l'installation de Node retrouver les versions [ici](https://nodejs.org/fr/download/) et vous pouvez vous appuyer de ce
[tutoriel](https://kinsta.com/fr/blog/comment-installer-node-js/).
:::

- **Node** 18.13.0
- **npm** 8.19.3

### OS

- **Windows 7** and above (64-bit only)
- **Ubuntu** 22.04.1 LTS and above
- **MacOS**

---

### Étape 1 : Cloner le repository github et installer toutes les dépendences
```sh
$ git clone https://github.com/Sioood/kartel-vue
```

```sh
# ./kartel-vue
$ npm install
```

## Config

### Étape 2

::: tip
Mettre à jour la configuration et tout les liens vers l'API en remplacant par les votres (http://127.0.0.1:5173/:port, localhost:port, preprod...).
:::

```json
// src/config.js

{
  "api_url": "http://127.0.0.1:5173/",
  "rest_uri_v2": "http://127.0.0.1:5173/v2/",
  "rest_uri": "http://127.0.0.1:5173/v1/",
  "media_service": "http://127.0.0.1:8888/",
  "reset_password_uri": "http://127.0.0.1:5173/account/reset_password/",
  "ame_rest_uri": "http://ame.127.0.0.1:5173/plugins/api_search/"
}
```

## Développement

### Étape 3 : Mettre en place l'application en mode développeur

```sh
$ npm run dev
```

### Mettre en place la documentation en mode développeur

```sh
$ npm run docs:dev
```

## Build

### Étape 4 : Build l'application

```sh
$ npm run build
```

### Build la documentation

```sh
$ npm run docs:build
```

## Effectuer des tests

### Voir la page [Tester l'application](../test/cypress.md).

## Kart

### Installation de Kart

### Installation de la Base de donnée BDD (Postgresql)

### Mise en place du media service

### Installation d'elasticsearch
