import express from 'express';
import createController from '../products/createController';
import createBusiness from '../products/business';
import mongoRepository from '../products/mongoRepository';

const router = express.Router();

const routes = () => {
  const controller = createController(createBusiness(mongoRepository));
  router.post('/product', controller.create);
  router.put('/product', controller.update);
  router.get('/product/:id', controller.findById);
  router.get('/products', controller.retrieve);
  router.delete('/product', controller.delete);

  return router;
};


export default routes;
