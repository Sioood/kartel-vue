# Architecture du site / router

::: info
Peut être fait avec mermaid flowchart par la suite.
:::

::: tip
Les premiers éléments présent dans l'arbre sont ceux accessibles par la barre de navigation (Home, School...).
<br/>
<br/>

Les élements _[Children]_ indique les composants enfant d'un composant parent, ceux-ci peuvent apparaitre nativement ou à l'action d'un utilisateur.
<br/>

**<ins>EX</ins>**: Dans School _promotion/:id_ est un enfant qui apparait a la séléction d'une promotion et qui change les étudiants présents. _/promotion/:id_ vient donc compléter la route _/school_ en donnant _/school/promotion/:id_ et en gardant le composant _school_ comme racine.
:::

#### Kartel

```sh
├── Home
│
├── School
│   ├── artist/:id
│   │   └── artwork/:id
│   │
│   └── [Childrens]
│       └── promotion/:id
│
├── Artists
│   └── artist/:id
│       └── artwork/:id
│
└── Artworks
    └── artwork/:id
        └── artist/:id
```

---

#### Kartel candidature

```
└── Candidature
    └── ...
```
