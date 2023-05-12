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
    "people/artist-search": "http://api.lefresnoy.net/v2/people/artist-search",
    "people/staff": "https://api.lefresnoy.net/v2/people/staff",
    "people/organization": "https://api.lefresnoy.net/v2/people/organization",
    "people/organization-staff": "https://api.lefresnoy.net/v2/people/organization-staff",
    "school/promotion": "https://api.lefresnoy.net/v2/school/promotion",
    "school/student": "https://api.lefresnoy.net/v2/school/student",
    "school/student-application": "https://api.lefresnoy.net/v2/school/student-application",
    "school/student-application-setup": "https://api.lefresnoy.net/v2/school/student-application-setup",
    "school/student-search": "https://api.lefresnoy.net/v2/school/student-search",
    "production/artwork": "https://api.lefresnoy.net/v2/production/artwork",
    "production/artwork-keywords": "https://api.lefresnoy.net/v2/production/artwork-keywords",
    "production/artwork-search": "https://api.lefresnoy.net/v2/production/artwork-search",
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
    "production/task": "https://api.lefresnoy.net/v2/production/task",
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

## Authentification

Les requêtes qui ont la possibilité d'une authentification seront munies de:
::: tip
authentification: true,
required: false.
:::

::: tip
Requête protégée par un JSON WEB TOKEN. <br/>
Nécessite de placer le token dans un headers "Authorization" et de son champ "JWT {token}" (Remplacer {token} par le vrai token JWT)
:::

```
method: 'GET',
headers: {
  'Content-Type': 'application/json'
  'Authorization': 'JWT {token}'

},
```

## People

## User

### Input request

::: tip
authentification: true,
required: false.
:::

```
https://api.lefresnoy.net/v2/people/user
```

### Parameters

::: tip
Pour constuire des paramètres de recherche il faut fonctionner de la manière suivante :<br/>

- La séparation entre le chemin et les paramètres s'effectue par un _?_, le premier paramètre sera toujours précédé d'un "?".
- Pour ajouter d'autres paramètres il faudra les séparer d'une _&_.
- Le paramètre sera suivi d'un _=_ qui sera lui même suivi de la valeur voulue pour ce paramètre.

EX: http://api.lefresnoy.net/v2/school/artwork-search?q=10:10&type=installation

- ?search=10:10 -> premier paramètre donc précédé d'un _?_.
- &type=installation -> deuxième paramètre donc précédé d'une _&_.

<br/><br/>
Remplacer ce qui se trouve entre accolades par la donnée voulue.
Exemple : _{username}_ -> selestane
:::

| **Parameter** | **Type** | **Description**  | **Example**       |
| ------------- | -------- | ---------------- | ----------------- |
| /:id          | Number   | The id of a user | /v2/people/user/1 |

| **Query** | **Type** | **Description** | **Example**                      |
| --------- | -------- | --------------- | -------------------------------- |
| search    | String   | A search text   | /v2/people/user?search=selestane |

### Response

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "https://api.lefresnoy.net/v2/people/user/1",
    "username": "selestane",
    "first_name": "Selene",
    "last_name": "Lamstane",
    "profile": {
      "id": 23,
      "photo": "http://api.lefresnoy.net/media/people/fresnoyprofile/selestane.jpg",
      "nationality": "FRA",
      "is_artist": true,
      "is_staff": false,
      "is_student": true
    }
  }
]
```

### Authentified response

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "is_superuser": false,
    "url": "http://localhost:8000/v2/people/user/1",
    "username": "selestane",
    "first_name": "Selene",
    "last_name": "Lamstane",
    "email": "selestane@kartel.net",
    "profile": {
      "id": 1,
      "photo": null,
      "gender": "female",
      "cursus": "",
      "nationality": "FR",
      "birthdate": "24/03/2004",
      "birthplace": "Tourcoing",
      "birthplace_country": "France",
      "mother_tongue": "Français",
      "other_language": "Anglais",
      "homeland_country": "FR",
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
  }
]
```

---

<br/><br/>

### Input request

::: tip
authentification: true,
required: true.
:::

```
https://api.lefresnoy.net/v2/people/userprofile
```

### Parameters

| **Parameter** | **Type** | **Description**         | **Example**              |
| ------------- | -------- | ----------------------- | ------------------------ |
| /:id          | Number   | The id of a userprofile | /v2/people/userprofile/1 |

| **Query** | **Type** | **Description** | **Example**                             |
| --------- | -------- | --------------- | --------------------------------------- |
| search    | String   | A search text   | /v2/people/userprofile?search=selestane |

### Response

```json
// 🟢 200 - Result

{
  "id": 1,
  "photo": null,
  "gender": "female",
  "cursus": "",
  "nationality": "FR",
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

```
https://api.lefresnoy.net/v2/people/artist
```

### Parameters

| **Parameter** | **Type** | **Description**     | **Example**         |
| ------------- | -------- | ------------------- | ------------------- |
| /:id          | Number   | The id of an artist | /v2/people/artist/1 |

| **Query**                                   | **Type** | **Description**                                   | **Example**                                                          |
| ------------------------------------------- | -------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| search                                      | String   | A username of an artist based on an user          | /v2/people/artist?search=selestane                                   |
| page_size                                   | Number   | The length result of the page                     | /v2/people/artist?page_size=10                                       |
| page                                        | Number   | The offset result of the page                     | /v2/people/artist?page=3                                             |
| artworks\_\_isnull                          | Boolean  | Results based on artist have artworks or not      | /v2/people/artist?artworks\_\_isnull=false                           |
| student\_\_isnull                           | Boolean  | Results based on artist is a student or not       | /v2/people/artist?student\_\_isnull=false                            |
| user\_\_profile\_\_nationality\_\_icontains | String   | Nationality of an artist based on his userprofile | /v2/people/artist?user\_\_profile\_\_nationality\_\_icontains=FR+FRA |

### Response

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "http://localhost:8000/v2/people/artist/1",
    "nickname": "selestane",
    "bio_short_fr": "",
    "bio_short_en": "",
    "bio_fr": "",
    "bio_en": "",
    "twitter_account": "Selestane",
    "facebook_profile": "Selestane",
    "user": "http://localhost:8000/v2/people/user/1",
    "websites": ["http://localhost:8000/v2/common/website/241"],
    "artworks": [
      {
        "url": "http://localhost:8000/v2/production/artwork/388",
        "title": "1"
      },
      {
        "url": "http://localhost:8000/v2/production/artwork/334",
        "title": "2"
      }
    ]
  }
]
```

## Staff / Organization

### Input request

```
https://api.lefresnoy.net/v2/people/staff
```

### Parameters

| **Parameter** | **Type** | **Description**   | **Example**        |
| ------------- | -------- | ----------------- | ------------------ |
| /:id          | Number   | The id of a staff | /v2/people/staff/1 |

| **Query** | **Type** | **Description**                        | **Example**                       |
| --------- | -------- | -------------------------------------- | --------------------------------- |
| search    | String   | A search string based on user username | /v2/people/staff?search=selestane |

### Response

```json
// 🟢 200 - Result
[
  {
    "user": "http://api.lefresnoy.net/v2/people/user/1",
    "production_task": [
      {
        "production": {
          "url": "http://api.lefresnoy.net/v2/production/artwork/1325",
          "title": "Quartz"
        },
        "task": {
          "label": "Musique originale",
          "description": "Musique composée"
        }
      }
    ]
  }
]
```

---

<br/><br/>

### Input request

```
https://api.lefresnoy.net/v2/people/organization
```

### Parameters

| **Parameter** | **Type** | **Description**           | **Example**               |
| ------------- | -------- | ------------------------- | ------------------------- |
| /:id          | Number   | The id of an organization | /v2/people/organization/1 |

### Response

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

```
https://api.lefresnoy.net/v2/people/organization-staff
```

### Parameters

| **Parameter** | **Type** | **Description**                 | **Example**                     |
| ------------- | -------- | ------------------------------- | ------------------------------- |
| /:id          | Number   | The id of an organization-staff | /v2/people/organization-staff/1 |

### Response

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

```
https://api.lefresnoy.net/v2/school/promotion
```

### Parameters

| **Parameter** | **Type** | **Description**       | **Example**             |
| ------------- | -------- | --------------------- | ----------------------- |
| /:id          | Number   | The id of a promotion | /v2/school/promotion/26 |

### Response

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

```
https://api.lefresnoy.net/v2/school/student
```

### Parameters

| **Parameter** | **Type** | **Description**     | **Example**          |
| ------------- | -------- | ------------------- | -------------------- |
| /:id          | Number   | The id of a student | /v2/school/student/1 |

| **Query** | **Type** | **Description**                                            | **Example**                                   |
| --------- | -------- | ---------------------------------------------------------- | --------------------------------------------- |
| artist    | Number   | An id based on his artist profile                          | /v2/school/student?artist=1                   |
| ordering  | String   | Order results with user\_\_last_name or -user\_\_last_name | /v2/school/student?ordering=user\_\_last_name |
| promotion | Number   | An id based on a promotion                                 | /v2/school/student?promotion=26               |
| user      | Number   | An id based of his user profile                            | /v2/school/student?user=1                     |

### Response

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

::: tip
authentification: true,
required: true.
:::

```
https://api.lefresnoy.net/v2/school/student-application
```

### Parameters

| **Parameter** | **Type** | **Description**                 | **Example**                      |
| ------------- | -------- | ------------------------------- | -------------------------------- |
| /:id          | Number   | The id of a student-application | /v2/school/student-application/1 |

| **Query**                    | **Type** | **Description**                                    | **Example**                                           |
| ---------------------------- | -------- | -------------------------------------------------- | ----------------------------------------------------- |
| search                       | String   | A search string based on a user username           | /v2/school/student?search=selestane                   |
| application_completed        | Boolean  | If the application is fully completed              | /v2/school/student?application_completed=true         |
| selected_for_interview       | Boolean  | If the applicant got selected for an interview     | /v2/school/student?selected_for_interview=true        |
| remote_interview             | Boolean  | If the interview is in remote                      | /v2/school/student?remote_interview=false             |
| wait_listed_for_interview    | Boolean  | If the applicant is in a waitlist for an interview | /v2/school/student?wait_listed_for_interview=true     |
| selected                     | Boolean  | If the applicant is selected                       | /v2/school/student?selected=true                      |
| unselected                   | Boolean  | If the applicant is unselected                     | /v2/school/student?unselected=true                    |
| campaign\_\_is_current_setup | Boolean  | If the applicant is in the current campaign        | /v2/school/student?ucampaign\_\_is_current_setup=true |
| wait_listed                  | Boolean  | If the applicant is in a waitlist                  | /v2/school/student?wait_listed=true                   |

### Response

```json
// 🟢 200 - Result
[
  {
    "id": 1,
    "url": "http://localhost:8000/v2/school/student-application/1",
    "campaign": null,
    "artist": "http://localhost:8000/v2/people/artist/11",
    "current_year_application_count": "2018-379",
    "identity_card": null,
    "INE": null,
    "first_time": true,
    "last_applications_years": "",
    "remote_interview": true,
    "remote_interview_type": "skype",
    "remote_interview_info": "France",
    "master_degree": "true",
    "experience_justification": null,
    "cursus_justifications": null,
    "curriculum_vitae": "http://localhost:8000/media/school/studentapplication/cv.pdf",
    "justification_letter": "http://localhost:8000/media/school/studentapplication/letter.pdf",
    "binomial_application": false,
    "binomial_application_with": "",
    "considered_project_1": "http://localhost:8000/media/school/studentapplication/project1.pdf",
    "artistic_referencies_project_1": "http://localhost:8000/media/school/studentapplication/references1.pdf",
    "considered_project_2": "http://localhost:8000/media/school/studentapplication/project1.pdf",
    "artistic_referencies_project_2": "http://localhost:8000/media/school/studentapplication/references2.pdf",
    "doctorate_interest": false,
    "presentation_video": "https://player.vimeo.com/video/1",
    "presentation_video_details": "Vidéo expérimentale",
    "presentation_video_password": "",
    "free_document": "http://localhost:8000/media/school/studentapplication/document.pdf",
    "remark": "J'ai connu le fresnoy à travers sa communication",
    "application_completed": true,
    "application_complete": true,
    "wait_listed_for_interview": false,
    "position_in_interview_waitlist": null,
    "selected_for_interview": true,
    "interview_date": null,
    "selected": true,
    "unselected": false,
    "wait_listed": false,
    "position_in_waitlist": null,
    "observation": "{}",
    "created_on": "2018-04-26T02:05:43.385451+02:00",
    "updated_on": "2018-10-09T07:59:51.367180+02:00"
  }
] 
```

---

<br/><br/>

### Input request

```
POST
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

### Response

```json
// 🟢 200 - Result
?
```

---

<br/><br/>

### Input request

```
POST
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

### Response

```json
// 🟢 200 - Result
?
```

---

<br/><br/>

### Input request

:::warning
Pas à jour
:::

```
https://api.lefresnoy.net/v2/school/student-search
```

## Production

### Artwork / Event

### Input request

```
https://api.lefresnoy.net/v2/production/artwork
```

### Parameters

:::tip
Plus de paramètres peuvent être ajouter au fur et à mesure de l'évolution des besoins de filtre et de recherche

Si _production_year_ n'est pas précisé, c'est une liste de tous les artworks qui en résulte.
_page_size_ et _page_ ne pas sont obligatoires
:::

| **Parameter** | **Type** | **Description**                 | **Example**              |
| ------------- | -------- | ------------------------------- | ------------------------ |
| /:id          | Number   | The id of a student-application | /v2/production/artwork/1 |

| **Query**       | **Type** | **Description**                                    | **Example**                                 |
| --------------- | -------- | -------------------------------------------------- | ------------------------------------------- |
| page_size       | Number   | The length result of the page                      | /v2/production/artwork?page_size=10         |
| page            | Number   | The offset result of the page                      | /v2/production/artwork?page=3               |
| keywords        | String   | A tag keyword                                      | /v2/production/artwork?keyword=amour        |
| production_year | Number   | The production year of an artwork                  | /v2/production/artwork?production_year=2020 |
| type            | Number   | The artwork type [film, installation, performance] | /v2/production/artwork?type=film            |

### List and filters

### Headers

:::warning
Il faut récupérer les headers avec ?
:::

_next_ et _previous_ servent d'offset et de repère pour de futures requêtes en fonction de la page actuelle.
Si _next_ ou _previous_ ne sont pas défini, cela veut dire que la page est soit la première soit la dernière.

```json
headers:{
  "count": Number,
  "next": "http://api.lefresnoy.net/v2/production/artwork?production_year=2022&page_size=3&page=6",
  "previous": "http://api.lefresnoy.net/v2/production/artwork?production_year=2022&page_size=3&page=5",
}
```

### Example

```
http://api.lefresnoy.net/v2/production/artwork?production_year=2022&page_size=3&page=5
```

### Response

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

```
https://api.lefresnoy.net/v2/production/artwork-keywords
```

### Response

```json
// 🟢 200 - Result
|
[
  {
        "id": 1,
        "name": "Amour",
        "slug": "Amour"
    },
]
```

---

<br/><br/>

### Input request

```
https://api.lefresnoy.net/v2/production/film
```

### Response

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

```
https://api.lefresnoy.net/v2/production/film-keywords
```

### Response

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

```
https://api.lefresnoy.net/v2/production/event
```

### Response

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

```
https://api.lefresnoy.net/v2/production/itinerary
```

### Parameters

| **Query** | **Type** | **Description** | **Example**                      |
| --------- | -------- | --------------- | -------------------------------- |
| event     | Number   | An event id     | /v2/production/itinerary?event=1 |

### Response

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

```
https://api.lefresnoy.net/v2/production/film-genre
```

### Response

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

```
https://api.lefresnoy.net/v2/production/installation
```

### Response

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

```
https://api.lefresnoy.net/v2/production/installation-genre
```

### Response

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

```
https://api.lefresnoy.net/v2/production/performance
```

### Response

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

---

<br/><br/>

### Input request

```
http://api.lefresnoy.net/v2/production/task
```

### Response

```json
// 🟢 200 - Result
[
  {
    "label": "Partenaire",
    "description": "Partenaire"
  },
  {
    "label": "Producteur",
    "description": "Produit une œuvre"
  }
]
```

### People

### Input request

```
https://api.lefresnoy.net/v2/production/collaborator
```

### Response

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

```
https://api.lefresnoy.net/v2/production/collaborator
```

### Response

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

```
https://api.lefresnoy.net/v2/diffusion/place
```

### Response

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

```
https://api.lefresnoy.net/v2/diffusion/meta-award
```

### Response

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

```
https://api.lefresnoy.net/v2/diffusion/award
```

### Response

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

```
https://api.lefresnoy.net/v2/diffusion/meta-event
```

### Response

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

```
https://api.lefresnoy.net/v2/diffusion/diffusion
```

### Response

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

```
https://api.lefresnoy.net/v2/common/beacon
```

### Response

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

```
https://api.lefresnoy.net/v2/common/website
```

### Response

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

```
https://api.lefresnoy.net/v2/assets/gallery
```

### Response

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

```
https://api.lefresnoy.net/v2/assets/medium
```

### Response

:::warning
Pas de réponse. <br/>
Besoin de préciser l'assets voulu dans l'url de la requête.
:::

---

<br/><br/>

## Recherche

### Artwork

### Input request

```
http://api.lefresnoy.net/v2/production/artwork-search
```

### Parameters

| **Query**       | **Type** | **Description**                                    | **Example**                                        |
| --------------- | -------- | -------------------------------------------------- | -------------------------------------------------- |
| q               | String   | A string search query based on artwork title       | /v2/production/artwork-search?q=10:10              |
| page_size       | Number   | The length result of the page                      | /v2/production/artwork-search?page_size=10         |
| page            | Number   | The offset result of the page                      | /v2/production/artwork-search?page=3               |
| keywords        | String   | A tag keyword                                      | /v2/production/artwork-search?keyword=amour        |
| production_year | Number   | The production year of an artwork                  | /v2/production/artwork-search?production_year=2020 |
| type            | Number   | The artwork type [film, installation, performance] | /v2/production/artwork-search?type=film            |
| genres          | String   | A genre (only for film type)                       | /v2/production/artwork-search?genres=documentaire  |
| shooting_place  | String   | A shooting_place (only for film type)              | /v2/production/artwork-search?shooting_place=paris |

### Response

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

```
http://api.lefresnoy.net/v2/school/student-search
```

### Parameters

| **Query** | **Type** | **Description**                              | **Example**                               |
| --------- | -------- | -------------------------------------------- | ----------------------------------------- |
| q         | String   | A string search query based on user username | /v2/production/student-search?q=selestane |

### Response

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

### Student

### Input request

```
http://api.lefresnoy.net/v2/people/artist-search
```

### Parameters

::: warning
Les Country code ont iso 2 et 3 lettres. La recherche d'un peut exclure l'autre dans les résultats.
:::
::: tip
Pour l'instant il faut donc combiner les 2 dans la recherche : nationality=FR{operator or (!need to update)}FRA.
:::

| **Query**   | **Type** | **Description**                              | **Example**                              |
| ----------- | -------- | -------------------------------------------- | ---------------------------------------- |
| q           | String   | A string search query based on user username | /v2/production/artist-search?q=selestane |
| nationality | String   | A nationality based on userprofile           | /v2/production/artist-search?q=FR+FRA    |

### Response

```json
// 🟢 200 - Result
[
  {
    "nickname": "selestane",
    "user": {
      "id": 1,
      "url": "http://api.lefresnoy.net/v2/people/user/1",
      "username": "selestane",
      "first_name": "Selene",
      "last_name": "Lamstane",
      "profile": {
        "id": 1369,
        "photo": "http://api.lefresnoy.net/media/people/fresnoyprofile/2018/selestane.png",
        "nationality": "FR",
        "is_artist": true,
        "is_staff": false,
        "is_student": true
      }
    }
  }
]
```
