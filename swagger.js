const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointFiles = [
    './src/features/movie/movies.route.js',
    './src/features/series/series.route.js',
    './src/features/music/musics.route.js'
];

const docs = {
    info: {
        version: "1.0.0",
        title: "Culture API",
        description: "Get movies, series or musics data."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Movies",
            "description": "Movies endpoints"
        },
        {
            "name": "Series",
            "description": "Series endpoints"
        },
        {
            "name": "Musics",
            "description": "Musics endpoints"
        },
    ],

};

swaggerAutogen(outputFile, endpointFiles, docs);