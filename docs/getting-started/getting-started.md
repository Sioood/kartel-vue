# Getting started

Cette page va vous aidez étape par étape à mettre en place Kartel _(et Kart)_.

## Kartel

## Prérequis

### Node.js

:::tip
Pour l'installation de Node retrouver les versions [ici](https://nodejs.org/fr/download/) et vous pouvez vous appuyer de ce
[tutoriel](https://kinsta.com/fr/blog/comment-installer-node-js/).
:::
Si tu utilises npm pour installer Kartel, il supporte :

- **Node** 18.13.0
- **npm** 8.19.3

### OS

- **Windows 7** and above (64-bit only)
- **Ubuntu** 22.04.1 LTS and above
- **MacOS**

---

### Setup IDE recommandé

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

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

:::info
Nécessite une installation d'une version de python au préalable (todo).
:::

### Installation de Kart

### Installation de Python

:::info
Prérequis: <br/>

- Python ^3.7
:::

```sh
$ git clone https://github.com/Fresnoy/kart.git

$ python3 -m virtualenv --python=/usr/bin/python3.7 kart-env

$ source kart-env/bin/activate

$ cd kart

$ cp kart/site_setting.py.dev kart/site_setting.py
# config à changer selon la votre

# $ BESOIN D'INSTALLER LES REQUIREMENTS
$ pip install -r requirements.txt

$ ./manage.py migrate
$ ./manage.py collectstatic
$ ./manage.py runserver
```

#### Créer des utilisateurs, privilèves... en se référérant à la documentation de la DB concerné

La base de donnée de base est intégrée en SQLite

Si besoin d'installer une base de donnée via Postegre

### Installation de la Base de donnée BDD (Postgresql)

```sh
$ sudo apt install postgresql

$ sudo service postgresql start

# Installer la db...
```

### Mise en place du media service

:::info
Nécessite l'installation de pillbox et d'une autre dépendence (todo).
:::

```sh
# $ pip install git+https://github.com/agschwender/pilbox@refs/pull/81/merge

$ mkdir mediaservice

$ cd mediaservice

$ python3 -m virtualenv --python=/usr/bin/python3.7 media-env

$ source media-env/bin/activate

$ pip3.7 install pilbox


```

#### Démarrer le média service

```sh
$ ./run.sh
```

### Installation d'elasticsearch

```sh
$ wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg

$ sudo apt-get install apt-transport-https

$ echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list

$ sudo apt-get update && sudo apt-get install elasticsearch
```

#### Démarrer elasticsearch

```sh
$ sudo service elasticsearch start

# rebuild index au premier démarrage ou à la mise à jour de la db
```
