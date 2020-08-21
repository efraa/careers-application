# Careers Application API 🚀

#### Endpoints

| METHOD   | USAGE                      | ENDPOINT                            |
|----------|----------------------------|-------------------------------------|
| POST     | Create an candidate        | api/candidates/                     |
| GET      | Get several candidates     | api/candidates/                     |
| GET      | Get an candidate's queues  | api/candidates/:candidateId/queues  |
| PUT      | Update an candidate        | api/candidates/                     |
| POST     | Create an queue            | api/queues/:candidateId             |
| GET      | Get an queue               | api/queues/:queueId                 |

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
