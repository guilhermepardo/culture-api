# Culture API

## Features

- Get movies data.
- Get series data.
- Get musics data.

## Tech

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Axios] - request to external API's
- [Nodemon] - developer tool
- [Dotenv] - Credentials privacy
- [Swagger] - API documentation

## Pre-Installation

- Create your TMDB user and get the key here: https://www.themoviedb.org/documentation/api
- Create your Musixmatch user and get the key here: https://developer.musixmatch.com/
- Add an .env file in the project root directory, and add this content:

TMDB_KEY= {Your TMDB user key}
MUSIXMATCH_KEY= {Your Musixmatch user key}

## Installation

- Install the dependencies and devDependencies and start the server.

```sh
cd culture-api
npm i
npm run dev
```

## Usage

- The application will start in localhost:3000/.
- Open your browser and go to localhost:3000/docs to see all endpoints, and how to use each.


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [axios]: <https://axios-http.com/docs/intro>
   [nodemon]: <https://nodemon.io/>
   [dotenv]: <https://www.npmjs.com/package/dotenv>
   [swagger]: <https://www.npmjs.com/package/swagger-ui-express>
