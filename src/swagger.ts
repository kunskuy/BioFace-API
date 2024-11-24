import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bioface API',
      version: '1.0.0',
      description: 'Collection API from Bioface',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./src/routes/predictionRoutes.ts'],
});
