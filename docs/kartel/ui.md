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

// Buttons & Inputs
import AppButton from '../../src/components/ui/AppButton.vue'
import AppDelete from '../../src/components/ui/AppDelete.vue'
import UiLink from '../../src/components/ui/UiLink.vue'
// import UiSearch from '../../src/components/ui/UiSearch.vue'


// Elements
import UnderlineTitle from '../../src/components/ui/UnderlineTitle.vue'
import UiDescription from '../../src/components/ui/UiDescription.vue'

// Images
import UiMedia from '../../src/components/ui/UiMedia.vue'
// import ArtworkCard from '../../src/components/artwork/ArtworkCard.vue'

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
  }
```

<WrapperPreview>
<AppButton text="Button" />
</WrapperPreview>

<br/>
<br/>

<!-- ### Search

```vue
<UiSearch url="#" text="link" />

````

<WrapperPreview>
<UiSearch/>
</WrapperPreview> -->

<br/>
<br/>

### Link

```vue
<UiLink url="#" text="link" />
````

#### Props

Extern est un Boolean qui indique si le lien implique de sortir du router et d'utiliser une ancre classique.

```js
{
  extern: Boolean,
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}
```

<WrapperPreview>
<UiLink url="#" text="link" class="cursor-pointer"/>
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
<UnderlineTitle title="Titre du composant" :underlineSize="2" :fontSize="1" />

<UnderlineTitle
  title="Un autre title"
  subtitle="subtitle"
  :uppercase="true"
  :fontSize="2"
/>
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

<br/>
<br/>

### Description

```vue
<UiDescription
  desc_fr="Une description française"
  desc_en="An english description"
/>
```

#### Props

Les descriptions en français ou en anglais. Elle ne sont pas obligatoires et on donc une conditon pour s'afficher seulement si il y a
du contenu

```js
{
  desc_fr: String,
  desc_en: String,
}
```

<WrapperPreview>
<UiDescription desc_fr="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus delectus commodi eos nulla. Soluta iste esse explicabo sed. Sed id, soluta illo in minus voluptates maxime reprehenderit aut recusandae." desc_en="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, quos. Fugiat at accusamus ea quaerat sunt, sapiente omnis accusantium reiciendis, saepe enim totam sed, itaque ipsa quod velit soluta expedita?"/>
</WrapperPreview>

<br/>
<br/>

## Images

### Médias

```vue
<UiMedia
  url="http://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif"
  title="media"
/>
```

#### Props

Medium est le média que l'on veut afficher quand on clique sur le composant. (il peut être une video, une image, un lien youtube...)
Par défaut il apparait comme une image.

```js
{
  url: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: false,
  },
  title: {
    type: String,
  },
}
```

<WrapperPreview>
<UiMedia url="http://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif" title="media"/>
</WrapperPreview>

<!-- Le composant invoque Pinia qui n'est pas dans vitepress donc bug, Dupliquer les composants pour en faire une version docs ? pas forcément pratique honnêtement... et sur une question de maintenabilité des modifications peuvent se perdre. -->
<!-- <br/>
<br/>

### Artwork Card

```vue
<ArtworkCard />
```

#### Props

```js
{
  url: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
}
```

<WrapperPreview>
<ArtworkCard url="#" picture="http://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif" title="media"/>
</WrapperPreview> -->
