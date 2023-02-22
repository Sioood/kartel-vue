# Cypress

Cypress est un outil de test frontal pour les applications Web, il permet de faire des tests _End to End_ (_E2E_) et des tests _composant_.

## WSL

:::warning
Si vous utilisez WSL, Cypress nécessite plusieures dépendences pour fonctionnner.
:::

```sh
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

## Lancer Cypress

```sh
$ npx cypress open
```

### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

```sh
npm run test:unit:dev # or `npm run test:unit` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
