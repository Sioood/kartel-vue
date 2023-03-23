# Les tests

Les tests sont d'une importance majeure dans la maintenabilité d'un projet tout autant que la documentation,
ils permettent de cibler les résultats escompter des méthodes et de leurs intégrations dans l'application.
Leur but est de confirmer que tout fonctionne comme il faut et que l'utilisateur pourra naviguer et faire toutes les actions qui sont censées être réalisables.
Mais ils sont aussi présents pour relever les erreurs en amonts, pouvoir les localiser efficacement et agir en toute rapidité.

## les différents type de tests

1. Les tests unitaires
2. Les tests d'intégration ou de composant
3. Les tests E2E (_End to End_)

Les tests fonctionnent de manière pyramidale il sont de plus en plus large dans leur manière de tester et donc moins nombreux au fur et à mesure.

## Les tests unitaires

Ce sont les plus _petits_ test présent dans la pyramide. Ils ciblent précisement, unitairement donc, la logique de l'application _out of the box_ ou _black box_.
La logique est donc testé indépendamment d'un composant, on ne cherche qu'a vérifier son résultat et non son intégration dans le document.
Les tests unitaires sont donc nombreux selon la volonté de couvrir précisement chaque méthodes. À savoir qu'un résultat peut être attendu et être obtenu de plusieurs méthode,
il faut donc faire un choix entre tester précisement chaque fonction dans une méthode ce qui peut amener à maintenir les tests souvent ou tester seulement le résultat escompté de cette méthode sans tenir compte de sa structure au plus petit niveau.

### Exemple d'un test unitaire

## Les tests d'intégration ou de composant

_in the box_, _white box_, les tests d'intégration sont dans l'environnement d'un composant. Ils permettent donc de tester une méthode dans le composant,
mais surtout les résultats dans le document.
Si une logique est testé de la même manière dans un test unitaire ou dans un test composant il est préférable de ne tester que le composant. Cela fait gagner du temps
et part du principe que le test le plus final est le composant.
(Un test unitaire peut être valide alors qu'un composant totalement similaire pourra rejeter une erreur. Ce qu'on attend c'est de se rapprocher au plus de l'utilisateur.)

### Exemple d'un test composant

## Les tests E2E

Les test End to End sont les tests qui se rapprochent le plus d'un vrai utilisateur, ils peuvent tester un petit ensemble ou tout un parcours, on peut les assimiler à des scénarios.
Ils nous permettent de vérifier dans la globalité d'une action (Remplir un formulaire par exemple), que tout se passe comme il devrait se passer.

### Exemple d'un test E2E



---

### Vue test utils
:::tip
Retrouvez la documentation [<ins>ici</ins>](https://test-utils.vuejs.org).
:::

Vue test utils est une library qui peut venir compléter les frameworks de test, elle est spécifique à Vue et permet donc d'accéder à l'environnement de vue,
comme par exemple les instances à l'intérieur d'un composant.
