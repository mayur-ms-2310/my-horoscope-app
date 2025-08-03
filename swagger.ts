import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const swaggerOptions : any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Horoscope App API',
      version: '1.0.0',
      description: 'Interactive documentation for your API'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.ts', './routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: import('express').Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
