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

<script setup>
import WrapperPreview from '../WrapperPreview.vue'

// Buttons
import AppButton from '../../src/components/ui/AppButton.vue'
import AppDelete from '../../src/components/ui/AppDelete.vue'

// Elements
import UnderlineTitle from '../../src/components/ui/UnderlineTitle.vue'
</script>

### Classic Button

```vue
<AppButton text="Button" />

//or

<AppButton text="Button"></AppButton>
```

#### Props

```js
text: {
    type: String,
    required: true,
  },
```

<WrapperPreview>
<AppButton text="Button" />
</WrapperPreview>

<br/>
<br/>

### Delete button

```vue
<AppDelete />
```

<WrapperPreview>
<AppDelete />
</WrapperPreview>

<br/>
<br/>

## Divers
### Titre souligné

```vue
<UnderlineTitle title="Titre du composant"   :underlineSize="2" :fontSize="1" />

<UnderlineTitle title="Un autre title" subtitle="subtitle" :uppercase="true" :fontSize="2" />
```

#### Props

```js
{
  title: {
    type: String,
    required: true,
  },
  subtitle: String, // Peut être vide si nécessaire
  uppercase: Boolean, // True si subtitle uppercase
  underlineSize: Number, // Taille de l'underline (1, 2)
  fontSize: Number, // Number correspond au taille de header existant en html.
  // Default h6
}
```

:::warning
La surcouche de style VitePress change la couleur et la marge...
:::

<WrapperPreview>
<UnderlineTitle title="Titre du composant"   :underlineSize="2" :fontSize="1" />

<UnderlineTitle title="Un autre title" subtitle="subtitle" :uppercase="true" :fontSize="2" />
</WrapperPreview>
