# User Interface

## Composants

Kartel est constitué d'une mulitude d'éléments et pour compréhension rapide de chaque page et de chaque intéraction,
il faut garder une cohérence graphique.

C'est donc pour ça que des composants réutilisables sont mis en place et peuvent être implémenter n'importe où, rapidement et
avec les props nécessaires à son intégration.

:::warning
Pas encore stable -> Besoin de VitePress en light mode.
<br/>
En light mode l'icone "🌖" permet de changer le theme du composant.
<br/>
<br/>
Chaque composant et réactif avec le thème. (light, dark)
:::

## Buttons et Inputs

### Button

```vue
<AppButton @click="">
  {{ content }}
</AppButton>
```

AppButton est composé d'un _`<slot></slot>`_ qui prend tout ce que si trouve à l'intérieur de _`<AppButton></AppButton>`_

---

### Input

```vue
<UiInput
  label="username"
  :required="true"
  pattern="\w{3,16}"
  inputTitle="Le nom d'utilisateur doit contenir au moins 3 caractères"
  placeholder="Kartel"
  type="text"
  @update:value="(value) => (username = value)"
></UiInput>
```

#### Props

```js
/**
 * Props
 * @property {string} label - label of the input
 * @property {string} pattern - Regex pattern validation
 * @required @property {string} placeholder - placeholder of the input
 * @property {Boolean} required - if the input is required or not
 * @property {string} inputTitle - title of the input when required is triggered
 * @required @property {string} type - type of input
 */
```

#### Emit

```js
/**
 *  The emit method to transfer input value to the parent from the children
 *  @param {ref} {ref} - the parent ref to receive value
 */
@update:value="(value) => ({ref} = value)"
```
