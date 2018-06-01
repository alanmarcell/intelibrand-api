import express from 'express';
import jsonProductRoutes from './jsonProductRoutes';
import mongoProductRoutes from './mongoProductRoutes';

const app = express();

const routes = async () => {
  app.use('/json', await jsonProductRoutes());
  app.use('/mongo', await mongoProductRoutes());

  return app;
};


export default routes;
