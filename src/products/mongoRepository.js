import { MongoClient } from 'mongodb';
import { merge, omit } from 'ramda';

const mongoUrl = 'mongodb://intelibrand:intelibrand1@ds131041.mlab.com:31041/intelibrand';

const getDb = url => MongoClient.connect(url);

const getDbCollection = client => client.db('intelibrand').collection('products');

const connectionHandler = async () => {
  const client = await getDb(mongoUrl);
  const collection = await getDbCollection(client);

  return { client, collection };
};

const findAll = async () => {
  const { client, collection } = await connectionHandler();
  const products = await collection.find({}).toArray();
  client.close();
  return products;
};

const save = async (product) => {
  try {
    const { client, collection } = await connectionHandler();
    const res = await collection.replaceOne({ _id: product.id }, omit(['id'], product), { upsert: true });
    client.close();
    return res;
  } catch (error) {
    return error;
  }
};

const findById = async (id) => {
  if (!id) {
    return null;
  }
  const { client, collection } = await connectionHandler();
  const product = await collection.findOne({ _id: id });

  client.close();

  return product;
};


const create = async (product) => {
  const { upsertedId: { _id }, ops } = await save(product);
  return merge(ops[0], { _id });
};


const deleteProduct = async (id) => {
  const { client, collection } = await connectionHandler();
  const { result } = await collection.deleteOne({ _id: id });

  client.close();

  return { success: result.ok };
};

const updateProduct = async (product) => {
  const productFromRepository = await findById(product.id);
  const productToSave = merge(productFromRepository, product);

  const { ops } = await save(productToSave);

  return ops[0];
};

export default {
  create,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
};
