# Careers Application API

The purpose is to streamline the position application process by
sending a personalized email to the recruiter.

> The Application assumes that your email is a **Gmail** account.

#### Endpoints

| METHOD   | USAGE                            | ENDPOINT                                     | COMPLETE   |
|----------|----------------------------------|----------------------------------------------|:----------:|
| POST     | Create an candidate              | api/candidates/                              | ✅         |
| GET      | Get several candidates           | api/candidates/                              | ✅         |
| PUT      | Update an candidate              | api/candidates/:candidateId                  | ✅         |
| PUT      | Add an candidate's recruiter     | api/candidates/:candidateId/recruiters       | ✅         |
| DELETE   | Delete an candidate's recruiter  | api/candidates/:candidateId/recruiters       | ✅         |
| GET      | Get an candidate's recruiters    | api/candidates/:candidateId/recruiters       | ✅         |
| POST     | Create an candidate's queue      | api/candidates/:candidateId/queues           | ✅         |
| GET      | Get an candidate's queues        | api/candidates/:candidateId/queues           |            |
| GET      | Get an queue                     | api/candidates/:candidateId/queues/:queueId  |            |
| POST     | Create an recruiter              | api/recruiters/                              | ✅         |
| GET      | Get several recruiters           | api/recruiters/                              | ✅         |

#### Prerequisites

The following tools should be installed before starting:

* [NodeJS >=10.x.x](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/)

#### Technologies

* [TypeScript](https://www.typescriptlang.org/): Is a typed superset of JavaScript that compiles to plain JavaScript.
* [TypeORM](https://typeorm.io/): Database ORM.
* [Docker](https://www.docker.com/): Automate the deployment of applications within containers.

#### Quick start

1. Make sure you have all the prerequisites above installed.
2. Clone this repo.
3. Move to the cloned directory.
4. Install deps, run ``` $ yarn install ```
5. Serve, compile and watching ``` $ yarn dev ```

#### Contributors

* [Efraa](https://github.com/Efraa)
