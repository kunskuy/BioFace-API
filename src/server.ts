import express from 'express';
import cors from 'cors';
import { PORT } from './config/model';
// import { loadModel } from './services/modelService';
// import predictionRoutes from './routes/predictionRoutes';
import bioRoutes from './routes/bioRoutes';
import { errorMiddlewares } from './middlewares/errorMiddlewares';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

async function startServer() {
  const app = express();
  // const model = await loadModel();
  // app.locals.model = model;

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.send('Bioface API');
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/', bioRoutes);
  // app.use(predictionRoutes);
  app.use(errorMiddlewares);

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

startServer().catch(console.error);