# Kart — API <Badge type="tip" text="^2.0" />

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

### Params

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
    "username": "Username",
    "first_name": "Name",
    "last_name": "Lastname"
  }
]
```

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

### Params

::: danger
Params possible à mettre à jour.
:::

### Expected output

```json
// 🟢 200 - Result

{
  "id": 1,
  "photo": null,
  "gender": "",
  "cursus": "",
  "nationality": "",
  "birthdate": null,
  "birthplace": null,
  "birthplace_country": "",
  "mother_tongue": "",
  "other_language": "",
  "homeland_country": "",
  "homeland_address": "",
  "homeland_zipcode": "",
  "homeland_town": "",
  "homeland_phone": "",
  "residence_phone": "",
  "residence_country": "",
  "residence_zipcode": "",
  "residence_address": "",
  "residence_town": "",
  "social_insurance_number": "",
  "family_status": "",
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

### Params

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
    "nickname": "",
    "bio_short_fr": "",
    "bio_short_en": "",
    "bio_fr": "",
    "bio_en": "",
    "twitter_account": "",
    "facebook_profile": "",
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

### Params

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
    "name": "",
    "description": "",
    "picture": null,
    "updated_on": "2015-06-18T16:33:17.310847+02:00"
  }
]
```

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
    "label": "",
    "description": ""
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
    "name": "",
    "starting_year": 2000,
    "ending_year": 2002
  }
]
```

<br/>

### Student

### Input request

```GET
https://api.lefresnoy.net/v2/school/student
```

### Params

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

### Input request

```GET
https://api.lefresnoy.net/v2/school/student-application
```

### Params

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
    "firstname": "",
    "lastname": "",
    "promotion": "Pina Bausch (2009-2011)",
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
    "description_fr": "Il est dix heures dix et le temps s’arrête sur les montres des publicités. Le logo de la marque peut apparaître fièrement au centre du V que forment alors les deux aiguilles. L’heure mercantile du consensus. Ici, le temps s’éternise. Une succession d’événements extraordinairement vains est en cours. Les protagonistes ne s’inquiètent pas trop, le chemin paraît bien balisé. Leurs gestes glissent et se répètent à la surface de l’écran. Le décor prend des initiatives et personne n’y prête vraiment attention. Alors l’intrigue multiplie les faux départs, rien ne se réalise et le réel bégaye. Les vases débordent et ne communiquent plus.",
    "description_en": "It's ten past ten and time stands still on the watches in advertisements. A brand logo proudly appears in the center of the V formed by the two hands. The mercantile hour of consensus.  \r\nHere time drags on and then starts again. A succession of extraordinarily vain events is in progress. The protagonists don’t worry too much, the path seems to be clearly indicated. Their gestures slide and repeat across the surface of the screen. The set takes some initiatives but no one really pays any attention. So the story has many false starts, nothing happens and the real stutters and stammers. The vessels overflow but no longer communicate.",
    "production_date": "2020-01-01",
    "credits_fr": "",
    "credits_en": "",
    "thanks_fr": "Adèle Arnaud, Juliette Azémar, Claude Closky, Cindy Coutant, Daniel Dobbels, Vincent Duault, Valentine Dufaye, Elliot Eugénie, Pierre Girardin, Olivier Jonvaux, Valérie Jouve, Tilhenn Klapper, Balthazar Lab, Pablo Lopez-Chaussée, Éric Prigent, Madeleine Van Doren, Louvre Lens Vallée, Les Amis des Beaux-Arts.",
    "thanks_en": "Adèle Arnaud, Juliette Azémar, Claude Closky, Cindy Coutant, Daniel Dobbels, Vincent Duault, Valentine Dufaye, Elliot Eugenie, Pierre Girardin, Olivier Jonvaux, Valérie Jouve, Tilhenn Klapper, Balthazar Lab, Pablo Lopez-Chaussée, Éric Prigent, Madeleine Van Doren, the Louvre-Lens Vallée, Les Amis des Beaux-Arts.",
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

### People
