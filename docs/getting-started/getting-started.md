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

```sh
$ git clone https://github.com/Fresnoy/kart.git

$ cd kart

# $ BESOIN D'INSTALLER LES REQUIREMENTS
# $ pip install psycopg2
$ pip install -r requirements.txt

$ cd ../

$ python3 -m virtualenv --python=/usr/bin/python3.7 kart-env

$ source kart-env/bin/activate

$ cd kart

$ ./manage.py runserver
```

### Installation de la Base de donnée BDD (Postgresql)
```sh
$ sudo apt install postgresql

$ cd kart

$ sudo service postgresql start
```

### Mise en place du media service
:::info
Nécessite l'installation de pillbox et d'une autre dépendence (todo).
:::


```sh
# $ pip3.7 install pilbox

$ pip install git+https://github.com/agschwender/pilbox@refs/pull/81/merge

$ mkdir mediaservice

$ cd mediaservice

# $ python3 -m virtualenv --python=/usr/bin/python3.7 media-env
$ python3 -m virtualenv media-env

$ source media-env/bin/activate

$ ./run.sh
```

### Installation d'elasticsearch

```sh
$ sudo apt-get install apt-transport-https
$ wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

#### Démarrer elasticsearch

```sh
$ sudo service elasticsearch start
```
