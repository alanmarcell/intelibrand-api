import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import BaseRoutes from './Routes';
import log from './utils/log';

(async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/', await BaseRoutes());

  app.use((error, res) => {
    res.status(error.status || 500);
    res.json({
      message: error.message || 'An error has occurred',
    });
  });

  const server = await http.createServer(app);

  app.listen(3000, async () => {
    await server.address();
    log(`Express server started at ${new Date()} listening on port: ${3000}`);
  });
})();

