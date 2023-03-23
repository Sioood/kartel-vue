# Le coverage

Le coverage c'est la "couverture" des tests, il permet d'avoir un aperçu de ce qui est testé dans l'application et
selon certaines mesures.

### Les mesures

- Statements: controle que chaque déclaration à éte exécutée au moins une fois par les tests.
- Branch: Vérifier si chaque condition a été testée (if,else... try,catch...).
- Functions: Relève le nombre de fonctions testées.
- Lines: Vérification du nombre de lignes présentes au lors des tests.

<br/>

---

<br/>

# Vitest — Tests unitaires

Tout les coverages ressortent dans le dossier coverage dans l'index.html.

```sh
├── Coverage
│   └── [index.html]
│
├── src
│
└── ...
```

Il vous suffit juste d'ouvrir l'index dans un navigateur.

```sh
$ npm run test:unit:coverage
```

# Cypress — Tests Composants et E2E

Tout les coverages ressortent dans le dossier coverage dans l'index.html du dossier lcov-report.

```sh
├── Coverage
│   ├── lcov-report
│   │   └── [index.html]
│   │
│   └── index.html─{unit coverage}
│
├── src
│
└── ...
```

Il vous suffit juste d'ouvrir l'index dans un navigateur.

Coverage seul des tests e2e

```sh
$ npm run test:e2e:dev:coverage
```

Coverage seulement des composants

```sh
$ npm run test:component:dev:coverage
```

Coverage des deux types

```sh
$ npm run test:dev:coverage
```
