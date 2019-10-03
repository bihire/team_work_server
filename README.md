[![Build Status](https://travis-ci.org/bihire/team_work_server.svg?branch=develop)](https://travis-ci.org/bihire/team_work_server)

[![Coverage Status](https://coveralls.io/repos/github/bihire/team_work_server/badge.svg?branch=develop)](https://coveralls.io/github/bihire/team_work_server?branch=develop)

# EPIC-Mail-3

A web app that helps Employees share articles between them

### Heroku API
[EPIC Email link](https://team-work-server.herokuapp.com/)

## Tools Used

[Javascript](https://javascript.info/) : Language used.

[NodeJS](https://nodejs.org/en/) : server environment.

[Express](http://expressjs.com/) : used for building fast APIs.

[Mocha and Chai](https://www.youtube.com/watch?v=MLTRHc5dk6s) : Testing Framework.

[Airbnb](https://github.com/airbnb/javascript) : Style Guide.

[Travis](https://travis-ci.org/) : Continuous Integration.

[nyc](https://github.com/istanbuljs/nyc) : Test coverage.

[Coveralls](https://coveralls.io/) : Git badge.

[Heroku](https://www.heroku.com/) : Deployment.

[Postman](https://www.getpostman.com/) : documentation


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
TO setup the project on your local machine do the following
Install Node
``` npm install node ```
Install Postgres

[Install Postgres](http://www.postgresqltutorial.com/install-postgresql/)

Clone the repo by running

```git clone https://github.com/bihire/team_work_server.git```

Then install all the necessary dependencies

``` 
npm install 
``` 
or 
``` 
npm i 
```

## Database setup

```
Creata a config/config.js file
```

Export the port number to be accessible in the file

```
{
    port: process.env.PORT || 8081
}
```

## Deployment

* URL = http://localhost:8081
* PORT = 8081


## Run the application

```
npm start
```

## Run tests

```
npm test
```

## Run coveralls

```
npm run ci
```

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index (welcome message) |
| /api/v1/auth/signup | POST | Signup a new User |
| /api/v1/auth/signin | POST | Signin registered User |
| /api/v1/articles | POST | POST an article |
| /api/v1/articles/`articleId` | GET | Get a specific article for a Employee |
| /api/v1/articles/`articleId` | PATCH | Update a specific Employee's article |
| /api/v1/feeds | GET | Get all the articles |
| /api/v1/articles/`articleId` | DELETE | Delete own article |
| /api/v1/my_articles | GET | Get all own articles |
| /api/v1/user/`userId` | GET | Get all author's articles |
| /api/v1/articles/`articleId`/comments | POST | Create a comment on an article |
| /api/v1/flags/`articleId`/articles | POST | Flag an article |
| /api/v1/flags/`commentId`/comments | POST | Flag an comment |
| /api/v1/admin/articles | GET | Admin get all flagged articles |
| /api/v1/admin/comments | GET | Admin get all flagged comments |
| /api/v1/admin/`flagArticleId`/ignore/articles | DELETE | Admin can Ignore a flagged article |
| /api/v1/admin/`flagCommentId`/ignore/comments | DELETE | Admin can Ignore a flagged comments |
| /api/v1/admin/`flagArticleId`/delete/articles | DELETE | Admin can delete a flagged article |
| /api/v1/admin/`flagCommentId`/delete/comments | DELETE | Admin can delete a flagged comments |


## Contributor
- Bihire Jules Boris <muhireboris@yahoo.fr>

---

## License & copyright
Copyright (c) Bihire Jules Boris, Web developer
