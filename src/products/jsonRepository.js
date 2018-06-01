import fs from 'fs';
import { findIndex, propEq, find, update, remove } from 'ramda';

const productsDataLocation = `${__dirname}/../../data/products.json`;

const findAll = () => {
  const products = JSON.parse(fs.readFileSync(productsDataLocation, 'utf8'));
  return products;
};

const save = (products) => {
  try {
    fs.writeFileSync(productsDataLocation, JSON.stringify(products), 'utf8');
    return products;
  } catch (error) {
    return error;
  }
};

const findById = (id) => {
  const products = findAll();

  return find(propEq('id', id), products);
};

const create = (product) => {
  const products = findAll();

  products.push(product);
  return save(products);
};


const deleteProduct = (id) => {
  const products = findAll();
  const productIndex = findIndex(propEq('id', id), products);

  if (productIndex < 0) {
    return null;
  }

  const newProducts = remove(productIndex, 1, products);

  return save(newProducts);
};

const updateProduct = (product) => {
  const { id } = product;

  const products = findAll();
  const newProductIndex = findIndex(propEq('id', id), products);

  if (newProductIndex < 0) {
    return null;
  }
  const newProducts = update(newProductIndex, product, products);

  save(newProducts);
  return findById(id);
};

export default {
  create,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
};
