# Kart — API <Badge type="tip" text="^2.0" />

:::info

## Notes

Expliquer les différentes utilisations des requêtes et pourquoi elles sont utilisées, de même pour les query parameters. <br/>
Du type le parameters "username" sert pour remettre à zéro le mot de passe d'un utilisateur en vérifiant le "username" qu'il envoie.<br/><br/>

Certains parameters peuvent être trouvés directement dans Kart. (Fouiller après avoir fouillé toute la v2)
:::

## Root

```
https://api.lefresnoy.net/v2/
```

### All

```
HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "people/user": "https://api.lefresnoy.net/v2/people/user",
    "people/userprofile": "https://api.lefresnoy.net/v2/people/userprofile",
    "people/artist": "https://api.lefresnoy.net/v2/people/artist",
    "people/staff": "https://api.lefresnoy.net/v2/people/staff",
    "people/organization": "https://api.lefresnoy.net/v2/people/organization",
    "people/organization-staff": "https://api.lefresnoy.net/v2/people/organization-staff",
    "school/promotion": "https://api.lefresnoy.net/v2/school/promotion",
    "school/student": "https://api.lefresnoy.net/v2/school/student",
    "school/student-application": "https://api.lefresnoy.net/v2/school/student-application",
    "school/student-application-setup": "https://api.lefresnoy.net/v2/school/student-application-setup",
    "school/student-search": "https://api.lefresnoy.net/v2/school/student-search",
    "production/artwork": "https://api.lefresnoy.net/v2/production/artwork",
    "production/film": "https://api.lefresnoy.net/v2/production/film",
    "production/film-keywords": "https://api.lefresnoy.net/v2/production/film-keywords",
    "production/event": "https://api.lefresnoy.net/v2/production/event",
    "production/itinerary": "https://api.lefresnoy.net/v2/production/itinerary",
    "production/film-genre": "https://api.lefresnoy.net/v2/production/film-genre",
    "production/installation": "https://api.lefresnoy.net/v2/production/installation",
    "production/installation-genre": "https://api.lefresnoy.net/v2/production/installation-genre",
    "production/performance": "https://api.lefresnoy.net/v2/production/performance",
    "production/collaborator": "https://api.lefresnoy.net/v2/production/collaborator",
    "production/partner": "https://api.lefresnoy.net/v2/production/partner",
    "diffusion/place": "https://api.lefresnoy.net/v2/diffusion/place",
    "diffusion/meta-award": "https://api.lefresnoy.net/v2/diffusion/meta-award",
    "diffusion/award": "https://api.lefresnoy.net/v2/diffusion/award",
    "diffusion/meta-event": "https://api.lefresnoy.net/v2/diffusion/meta-event",
    "diffusion/diffusion": "https://api.lefresnoy.net/v2/diffusion/diffusion",
    "common/beacon": "https://api.lefresnoy.net/v2/common/beacon",
    "common/website": "https://api.lefresnoy.net/v2/common/website",
    "assets/gallery": "https://api.lefresnoy.net/v2/assets/gallery",
    "assets/medium": "https://api.lefresnoy.net/v2/assets/medium"
}
```

## People

## User

### Input request

```GET
https://api.lefresnoy.net/v2/people/user
```

### parameters

::: tip
Remplacer ce qui se trouve entre accolades par la donnée voulue.
Exemple : _{username}_ -> kartel
:::

```
?search={username}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "https://api.lefresnoy.net/v2/people/user/1",
    "username": "selestane",
    "first_name": "Selene",
    "last_name": "Lamstane"
  }
]
```

---

<br/><br/>

### Input request

::: warning
Requête protégée par un JSON WEB TOKEN. <br/>
Nécessite de placer le token dans un headers "Authorization" et de son champ "JWT {token}" (Remplacer {token} par le vrai token JWT)
:::

```GET
method: 'GET',
headers: {
  'Content-Type': 'application/json'
  'Authorization': 'JWT {token}'

},

https://api.lefresnoy.net/v2/people/userprofile
```

### parameters

::: danger
parameters possible à mettre à jour.
:::

### Expected output

```json
// 🟢 200 - Result

{
  "id": 1,
  "photo": null,
  "gender": "female",
  "cursus": "",
  "nationality": "Française",
  "birthdate": "24/03/2004",
  "birthplace": "Tourcoing",
  "birthplace_country": "France",
  "mother_tongue": "Français",
  "other_language": "Anglais",
  "homeland_country": "France",
  "homeland_address": "123 Rue du Fresnoy",
  "homeland_zipcode": "59200",
  "homeland_town": "Tourcoing",
  "homeland_phone": "06 59 84 23 97",
  "residence_phone": "06 59 84 23 97",
  "residence_country": "France",
  "residence_zipcode": "59200",
  "residence_address": "123 Rue du Fresnoy",
  "residence_town": "Tourcoing",
  "social_insurance_number": "",
  "family_status": "Célibataire",
  "is_artist": true,
  "is_staff": false,
  "is_student": false
}
```

## Artist

### Input request

```GET
https://api.lefresnoy.net/v2/people/artist
```

### parameters

::: info
Paramètre de recherche basé sur l'username du profil user. Pas très pratique.
:::

```
?search={username}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "https://api.lefresnoy.net/v2/people/artist/1",
    "nickname": "selestane",
    "bio_short_fr": "",
    "bio_short_en": "",
    "bio_fr": "",
    "bio_en": "",
    "twitter_account": "selestane",
    "facebook_profile": "selestane",
    "user": "https://api.lefresnoy.net/v2/people/user/1",
    "websites": ["https://api.lefresnoy.net/v2/common/website/1"]
  }
]
```

## Staff / Organization

### Input request

```GET
https://api.lefresnoy.net/v2/people/staff
```

### parameters

::: info
Paramètre de recherche basé sur l'username du profil user. Pas très pratique.
:::

```
?search={username}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "user": "https://api.lefresnoy.net/v2/people/user/1"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/people/organization
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/people/organization/1",
    "name": "Le Fresnoy",
    "description": "Le Fresnoy - Studio national des arts contemporains est un établissement français de formation, de production et de diffusion artistiques, audiovisuelles et numériques.",
    "picture": null,
    "updated_on": "2015-06-18T16:33:17.310847+02:00"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/people/organization-staff
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/people/organization-staff/1",
    "label": "Le Fresnoy",
    "description": "Le Fresnoy - Studio national des arts contemporains est un établissement français de formation, de production et de diffusion artistiques, audiovisuelles et numériques."
  }
]
```

## School

### Promotion

### Input request

```GET
https://api.lefresnoy.net/v2/school/promotion
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/school/promotion/1",
    "name": "Marguerite Duras",
    "starting_year": 2021,
    "ending_year": 2023
  }
]
```

<br/>

---

<br/><br/>

### Student

### Input request

```GET
https://api.lefresnoy.net/v2/school/student
```

### parameters

::: info
Les paramètres de recherche se basent sur des id's par forcément connus au moment de la requête.
:::

```
?artist={id}
&ordering={user__last_name or -user__last_name}
&promotion={id}
&user={id}
```

### Expected output

::: warning

L'id n'est pas identique pour chaque catégorie (user, artist, student...).<br/>
Un utilisateur peut avoir l'id "2" d'_x_ et le "333" d'_user_.
:::

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/school/student/1",
    "number": "",
    "graduate": false,
    "promotion": "https://api.lefresnoy.net/v2/school/promotion/1",
    "user": "https://api.lefresnoy.net/v2/people/user/1",
    "artist": "https://api.lefresnoy.net/v2/people/artist/1"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/school/student-application
```

### parameters

```
?application_completed={true or false}
&application_complete=&selected_for_interview={true or false}
&remote_interview={true or false}
&wait_listed_for_interview={true or false}
&selected={true or false}
&unselected={true or false}
&campaign__is_current_setup={true or false}
&wait_listed={true or false}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "https://api.lefresnoy.net/v2/school/student-application/1"
  }
]
```

---

<br/><br/>

### Input request

```POST
https://api.lefresnoy.net/v2/school/student-application/user_register
```

body

```json
{
  "username": ["Ce champ est obligatoire."],
  "first_name": ["Ce champ est obligatoire."],
  "last_name": ["Ce champ est obligatoire."],
  "email": ["Ce champ est obligatoire."]
}
```

### Expected output

```json
// 🟢 200 - Result
?
```

---

<br/><br/>

### Input request

```POST
https://api.lefresnoy.net/v2/school/student-application/user_resend_activation_email
```

body

```json
{
  "username": ["Ce champ est obligatoire."],
  "first_name": ["Ce champ est obligatoire."],
  "last_name": ["Ce champ est obligatoire."],
  "email": ["Ce champ est obligatoire."]
}
```

### Expected output

```json
// 🟢 200 - Result
?
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/school/student-search
```

Student Autocomplete Search List

### Expected output

```json
// 🟢 200 - Result
[
  {
    "text": "",
    "firstname": "Selene",
    "lastname": "Lamstane",
    "promotion": "Marguerite Duras (2021-2023)",
    "content_auto": ""
  }
]
```

## Production

### Artwork / Event

### Input request

```GET
https://api.lefresnoy.net/v2/production/artwork
```

### Parameters

Rechercher des artworks selon ses ou son auteur.

```
authors={artist_id}
```

Si vous avez besoin de sortir une certaine liste d'artworks en fonction de filtres, avec un offset et un nombre d'artwork maximum.
```
?production_year={Number(Year)}
&page_size={Number}
&page={Number}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/installation/1286",
    "collaborators": [],
    "partners": [
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/1",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/211",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/1"
      }
    ],
    "diffusion": ["https://api.lefresnoy.net/v2/diffusion/diffusion/889"],
    "award": [],
    "title": "10:10",
    "former_title": null,
    "subtitle": null,
    "updated_on": "2020-10-20T10:36:14.066555+02:00",
    "picture": "https://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif",
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "description_en": "",
    "production_date": "2020-01-01",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "",
    "thanks_en": "",
    "copyright_fr": "",
    "copyright_en": "",
    "technical_description": "",
    "websites": [],
    "process_galleries": [],
    "mediation_galleries": [],
    "in_situ_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3602"],
    "press_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3768"],
    "teaser_galleries": [],
    "authors": ["https://api.lefresnoy.net/v2/people/artist/1616"],
    "beacons": [],
    "genres": ["https://api.lefresnoy.net/v2/production/installation-genre/2"],
    "type": "Installation"
  }
]
```

---

<br/><br/>

### Artwork list and filters

### Input request

```GET
http://preprod.api.lefresnoy.net/v2/production/artwork?production_year=2022&page_size=3&page=5
```

### Headers

:::warning
Il faut récupérer les headers avec ''
:::

_next_ et _previous_ servent d'offset et de repère pour de futures requêtes en fonction de la page actuelle.
Si _next_ ou _previous_ ne sont pas défini, cela veut dire que la page est soit la première soit la dernière.

```json
headers:{
  "count": Number,
  "next": "URL",
  "previous": "URL",
}
```

### Parameters

:::tip
Plus de paramètres peuvent être ajouter au fur et à mesure de l'évolution des besoins de filtre et de recherche
:::

Si _production_year_ n'est pas précisé, c'est une liste de tous les artworks qui en résulte.
_page_size_ et _page_ sont obligatoires

```
?production_year={year}
page_size={Number}
page={Number}
```

### Expected output

```json
// 🟢 200 - Result

```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/film
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/film/1879",
    "collaborators": [],
    "partners": [
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/1",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/243",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/3"
      }
    ],
    "diffusion": ["https://api.lefresnoy.net/v2/diffusion/diffusion/917"],
    "award": [],
    "keywords": [],
    "title": "#31#",
    "former_title": null,
    "subtitle": "Appel masqué",
    "updated_on": "2022-04-21T16:40:42.599306+02:00",
    "picture": "https://api.lefresnoy.net/media/production/film/2021/07/boukaila_ghyzlene_2_jr5.jpg",
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "production_date": "2021-07-06",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "",
    "thanks_en": "",
    "copyright_fr": "",
    "copyright_en": "",
    "duration": null,
    "shooting_format": "",
    "aspect_ratio": "",
    "process": "",
    "websites": [],
    "process_galleries": [],
    "mediation_galleries": [],
    "in_situ_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/4110"],
    "press_galleries": [],
    "teaser_galleries": [],
    "authors": ["https://api.lefresnoy.net/v2/people/artist/1904"],
    "beacons": [],
    "genres": [],
    "shooting_place": []
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/film-keywords
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 34,
    "name": "ville",
    "slug": "ville"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/event
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/event/1224",
    "partners": [],
    "collaborators": [],
    "parent_event": ["https://api.lefresnoy.net/v2/production/event/907"],
    "meta_award": [],
    "meta_event": null,
    "title": "20 ans de danse contemporaine au Fresnoy",
    "former_title": null,
    "subtitle": null,
    "updated_on": "2019-11-07T12:45:14.291946+01:00",
    "picture": null,
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "description_en": "",
    "main_event": false,
    "type": "EVENING",
    "starting_date": "2019-11-09T14:00:00+01:00",
    "ending_date": "2019-11-10T19:00:00+01:00",
    "place": "https://api.lefresnoy.net/v2/diffusion/place/1",
    "websites": [],
    "installations": [],
    "films": [],
    "performances": [],
    "subevents": []
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/itinerary
```

### Parameters

```
?event={id}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/itinerary/1",
    "updated_on": "2014-06-05T18:41:24.214797+02:00",
    "label_fr": "Métamorphoses",
    "label_en": "Métamorphoses",
    "description_fr": "",
    "description_en": "",
    "event": "https://api.lefresnoy.net/v2/production/event/53",
    "artworks": ["https://api.lefresnoy.net/v2/production/artwork/38"],
    "gallery": []
  },
  {
    "url": "https://api.lefresnoy.net/v2/production/itinerary/2",
    "updated_on": "2016-04-18T16:18:53.331212+02:00",
    "label_fr": "Panorama 17",
    "label_en": "Panorama 17",
    "description_fr": " ",
    "description_en": " ",
    "event": "https://api.lefresnoy.net/v2/production/event/533",
    "artworks": ["https://api.lefresnoy.net/v2/production/artwork/580"],
    "gallery": []
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/itinerary
```

### Parameters

```
?event={id}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/itinerary/1",
    "updated_on": "2014-06-05T18:41:24.214797+02:00",
    "label_fr": "Métamorphoses",
    "label_en": "Métamorphoses",
    "description_fr": "",
    "description_en": "",
    "event": "https://api.lefresnoy.net/v2/production/event/53",
    "artworks": ["https://api.lefresnoy.net/v2/production/artwork/38"],
    "gallery": []
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/film-genre
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/film-genre/3",
    "label": "Documentaire"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/installation
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/installation/1286",
    "collaborators": [],
    "partners": [
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/1",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/211",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/1"
      }
    ],
    "diffusion": ["https://api.lefresnoy.net/v2/diffusion/diffusion/889"],
    "award": [],
    "title": "10:10",
    "former_title": null,
    "subtitle": null,
    "updated_on": "2020-10-20T10:36:14.066555+02:00",
    "picture": "https://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif",
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "description_en": "",
    "production_date": "2020-01-01",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "",
    "thanks_en": "",
    "copyright_fr": "",
    "copyright_en": "",
    "technical_description": "",
    "websites": [],
    "process_galleries": [],
    "mediation_galleries": [],
    "in_situ_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3602"],
    "press_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3768"],
    "teaser_galleries": [],
    "authors": ["https://api.lefresnoy.net/v2/people/artist/1616"],
    "beacons": [],
    "genres": ["https://api.lefresnoy.net/v2/production/installation-genre/2"]
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/installation-genre
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/installation-genre/1",
    "label": "Installation intéractive et multimédia"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/performance
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/performance/773",
    "collaborators": [],
    "partners": [
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/1",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/88",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/106",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      }
    ],
    "diffusion": [
      "https://api.lefresnoy.net/v2/diffusion/diffusion/499",
      "https://api.lefresnoy.net/v2/diffusion/diffusion/856"
    ],
    "award": [],
    "title": "(à) partir",
    "former_title": "",
    "subtitle": "Pièce chorégraphique et lumineuse",
    "updated_on": "2018-03-01T11:49:03.940676+01:00",
    "picture": "https://api.lefresnoy.net/media/production/performance/Xtgq5FM5rj.jpg",
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "description_en": "",
    "production_date": "2017-01-01",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "",
    "thanks_en": "",
    "copyright_fr": "",
    "copyright_en": "",
    "websites": ["https://api.lefresnoy.net/v2/common/website/632"],
    "process_galleries": [],
    "mediation_galleries": [],
    "in_situ_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/1950"],
    "press_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/2034"],
    "teaser_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/2119"],
    "authors": ["https://api.lefresnoy.net/v2/people/artist/570"],
    "beacons": []
  }
]
```

### People

### Input request

```GET
https://api.lefresnoy.net/v2/production/collaborator
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/collaborator/1",
    "staff": {
      "user": "https://api.lefresnoy.net/v2/people/user/1827"
    },
    "task": {
      "label": "Commissaire d'exposition",
      "description": ""
    }
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/production/collaborator
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "organization": "https://api.lefresnoy.net/v2/people/organization/1",
    "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
  }
]
```

## Diffusion

### Input request

```GET
https://api.lefresnoy.net/v2/diffusion/place
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/diffusion/place/14",
    "name": "Rotterdam",
    "description": "Rotterdam est une importante ville portuaire de la province néerlandaise de Hollande-Méridionale. Les navires anciens et les expositions du musée maritime retracent l'histoire navale de la ville. Le quartier de Delfshaven, datant du XVIIe siècle, regorge de boutiques le long du canal ; c'est également le site de l'église des Pères pèlerins, où les pèlerins se recueillaient avant de naviguer vers l'Amérique. Après avoir été presque totalement reconstruite à la suite de la 2nde Guerre mondiale, la ville est à présent connue pour son architecture moderne et audacieuse.",
    "address": "Centre Ville",
    "zipcode": "",
    "city": "Rotterdam",
    "country": "NL",
    "latitude": "51.922500",
    "longitude": "4.479170",
    "organization": null
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/diffusion/meta-award
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/diffusion/meta-award/1",
    "task": {
      "label": "Réalisation",
      "description": "Dirige la fabrication d'une œuvre audiovisuelle, généralement pour le cinéma ou la télévision mais aussi pour la radio."
    },
    "label": "Prix studio Collector",
    "description": "Initié par Isabelle & Jean-Conrad Lemaître et doté de 5 000€, le prix StudioCollector récompense un artiste du Fresnoy - Studio national des arts contemporains, sélectionné lors de l’exposition Panorama, rendez-vous annuel de la création au Fresnoy. Cette année, le prix sera remis par Françoise et Jean Claude Quemin, collectionneurs",
    "type": "INDIVIDUAL",
    "event": "https://api.lefresnoy.net/v2/production/event/914"
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/diffusion/award
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/diffusion/award/4",
    "artwork": ["https://api.lefresnoy.net/v2/production/artwork/1211"],
    "ex_aequo": false,
    "date": "2019-09-20",
    "amount": "1000 €",
    "note": "Prix décerné par",
    "meta_award": "https://api.lefresnoy.net/v2/diffusion/meta-award/5",
    "event": "https://api.lefresnoy.net/v2/production/event/907",
    "sponsor": "https://api.lefresnoy.net/v2/people/organization/182",
    "artist": ["https://api.lefresnoy.net/v2/people/user/1130"],
    "giver": []
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/diffusion/meta-event
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/diffusion/meta-event/922",
    "keywords": ["biennale"],
    "genres": ["PERF", "INST"],
    "important": true
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/diffusion/diffusion
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/diffusion/diffusion/1",
    "first": null,
    "on_competition": false,
    "event": "https://api.lefresnoy.net/v2/production/event/605",
    "artwork": "https://api.lefresnoy.net/v2/production/artwork/593"
  }
]
```

## Commons

### Input request

```GET
https://api.lefresnoy.net/v2/common/beacon
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/common/beacon/1",
    "label": "Beacon 16",
    "uuid": "e2c56db5-dffb-48d2-b060-d0f5a7109616",
    "rssi_in": 47,
    "rssi_out": 42,
    "x": 20.0,
    "y": 60.0
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/common/website
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "https://api.lefresnoy.net/v2/common/website/1",
    "link": "http://www.undefine.ca/en/artists/thomas-mcintosh/",
    "title_fr": "undefine",
    "title_en": "undefine",
    "language": "EN"
  }
]
```

## Assets

### Input request

```GET
https://api.lefresnoy.net/v2/assets/gallery
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "id": 2618,
    "url": "https://api.lefresnoy.net/v2/assets/gallery/2618",
    "label": "",
    "description": "",
    "media": [
      "https://api.lefresnoy.net/v2/assets/medium/9385",
      "https://api.lefresnoy.net/v2/assets/medium/9386"
    ]
  }
]
```

---

<br/><br/>

### Input request

```GET
https://api.lefresnoy.net/v2/assets/medium
```

### Expected output

:::warning
Pas de réponse. <br/>
Besoin de préciser l'assets voulu dans l'url de la requête.
:::

---

<br/><br/>

## Recherche

### Artwork

### Input request

```GET
http://preprod.api.lefresnoy.net/v2/production/artwork-search
```

### Parameters

```GET
?q={something}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/production/installation/1286",
    "collaborators": [],
    "partners": [
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/1",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/2"
      },
      {
        "organization": "https://api.lefresnoy.net/v2/people/organization/211",
        "task": "https://api.lefresnoy.net/v2/people/organization-staff/1"
      }
    ],
    "diffusion": ["https://api.lefresnoy.net/v2/diffusion/diffusion/889"],
    "award": [],
    "title": "10:10",
    "former_title": null,
    "subtitle": null,
    "updated_on": "2020-10-20T10:36:14.066555+02:00",
    "picture": "https://api.lefresnoy.net/media/production/installation/2020/09/olivier_bemer_10h10_05_q2d_b3A.tif",
    "description_short_fr": "",
    "description_short_en": "",
    "description_fr": "",
    "description_en": "",
    "production_date": "2020-01-01",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "",
    "thanks_en": "",
    "copyright_fr": "",
    "copyright_en": "",
    "technical_description": "",
    "websites": [],
    "process_galleries": [],
    "mediation_galleries": [],
    "in_situ_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3602"],
    "press_galleries": ["https://api.lefresnoy.net/v2/assets/gallery/3768"],
    "teaser_galleries": [],
    "authors": ["https://api.lefresnoy.net/v2/people/artist/1616"],
    "beacons": [],
    "genres": ["https://api.lefresnoy.net/v2/production/installation-genre/2"],
    "type": "Installation"
  }
]
```

---

<br/><br/>

### Student

### Input request

```GET
http://preprod.api.lefresnoy.net/v2/school/student-search
```

### Parameters

```GET
?q={something}
```

### Expected output

```json
// 🟢 200 - Result
[
  {
    "url": "https://api.lefresnoy.net/v2/school/student/1",
    "number": "",
    "graduate": false,
    "promotion": "https://api.lefresnoy.net/v2/school/promotion/1",
    "user": "https://api.lefresnoy.net/v2/people/user/1",
    "artist": "https://api.lefresnoy.net/v2/people/artist/1"
  }
]

```
