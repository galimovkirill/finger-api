import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen();

const doc = {
    info: {
        version: '1.0.0',
        title: 'Finger API',
        description: 'Finger | Документация API'
    },
    host: 'localhost:3001',
    basePath: '/api',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        Authorization: {
            type: 'Bearer',
            in: 'header',
            name: 'Authorization'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/main.ts'];

swagger(outputFile, endpointsFiles, doc);
