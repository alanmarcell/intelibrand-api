import { v4 } from 'uuid';
import { merge } from 'ramda';

const checkRequiredParam = (requiredParams, product) =>
  requiredParams.map((param) => {
    if (!product[param]) {
      return `The param ${param} is required for this action`;
    }
    return null;
  })[0];


const checkProductFound = (res, id) => {
  if (res) { return res; }

  return `Product with id ${id} not found`;
};

const createApp = Repository => ({
  getAll: () => Repository.findAll(),
  findById: id => checkProductFound(Repository.findById(id), id),

  create: async (product) => {
    if (product.id) {
      const productFromRepository = await Repository.findById(product.id);

      if (productFromRepository) {
        return `A product with id ${product.id} already exists`;
      }
    }

    const productToSave = merge(product, {
      id: product.id || v4(),
    });

    return Repository.create(productToSave);
  },

  updateProduct: product =>
    checkRequiredParam(['id'], product) || checkProductFound(Repository.updateProduct(product), product.id),


  deleteProduct: id => checkRequiredParam(['id'], { id }) || checkProductFound(Repository.deleteProduct(id), id),
});

export default createApp;
