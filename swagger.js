const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointFiles = [
    './src/features/movie/movies.route.js',
    './src/features/series/series.route.js',
    './src/features/music/musics.route.js'
];

swaggerAutogen(outputFile, endpointFiles);