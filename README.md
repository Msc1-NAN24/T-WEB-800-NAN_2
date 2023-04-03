# T-WEB-800-NAN_2

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)


> This project is an EPITECH Project. If you are an EPITECH student, move out the way! Nothing to see here... The groups don't want to be involved to your -42.
> If you're not, no worries! You're welcome here!


#### Code Quality

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Msc1-NAN24_T-WEB-800-NAN_2&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Msc1-NAN24_T-WEB-800-NAN_2&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Msc1-NAN24_T-WEB-800-NAN_2&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=frnikho_count-of-money)

****

### Lien du repo privé

https://github.com/Msc1-NAN24/T-WEB-800-NAN_2

### Lien du Trello
https://trello.com/b/awKNShm3/web

## Documentation

Le projet est basé sur un mono repo. il contient :
- Une Api Gateway (NestJS)
- Une Application Web (NextJS)
- Des micro services NestJS:
  - Places
  - Events
  - User
  - Travel

### Schéma d'architecture du projet

![Figma](./documentation/API%20flowchart%20example%20-%20API%20flowchart%20example.png)

Pour créer un nouveau micro-service, il faut se rendre dans /app/api puis faire:

```shell
$ nest new [appname]
```
### CLI

**Frontend:**

dans le dossier app/frontend:

```shell
$ pnpm run dev
```

Pour lancer les tests de TDD:

```shell
$ pnpm run test
# ou bien pour tout lancer
$ pnpm run test:ci
```

### Swagger

Chaque micro-services disposent de son swagger sur la route /api.

### CI:

3 actions github ont été créés dans le dossier '.github/workflows':
- Le build afin de vérifier le bon fonctionnement de l'application,
- le linter qui vise à améliorer la qualité du code
- les tests qui exécutent les tests web et api et qui envoie les données a sonarcloud afin d'avoir une interface plus détaillée de nos tests, coverage et issues possibles

La CI est exécuté automatiquement à chaque changement qui touche de prés ou de loin a main (ouverture d'une PR, merge d'une PR...)

Pour le build de la CI, trois versions de node sont testés et ont pour but de vérifier la compatibilité de notre application dans le temps avec les librairies installées.


### Docker:

Nos services ont été découper dans un docker compose afin d'orchestrer le build et le deployment de façon autonome notre application.

Un docker compose de développement, qui facilite le développement d'une partie de notre application ou d'un service

Notre docker compose comprends au minimum 3 services:

- **MongoDB**, notre base de données
- **Api Gateway**, notre application nestjs qui est construite selon le Dockerfile
- **Web**, notre application NextJS qui est également construite selon le Dockerfile

Et également les micro services:

- **Places**
- **Travels**
- **User**

## Installation

### Prérequis

Avant de lancer vos conteneurs, un fichier `.env` doit être créé à la racine du repo. Vous pouvez dupliquez le `.env.example` afin d'avoir les variables d'environnements requis par l'application.

### Commandes

Pour lancer le docker-compose de développement:
```shell
# A la racine du repository
$ docker-compose up  # Docker compose v1
$ docker compose up  # Docker compose v2
```

Pour stopper les conteneurs en cours d'utilisations:
```shell
# A la racine du repository
$ docker-compose down  # Docker compose v1
$ docker compose down  # Docker compose v2
```