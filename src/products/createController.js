const createController = business => ({
  create: async ({ body }, res) => {
    res.send(await business.create(body));
  },
  retrieve: async (req, res) => {
    res.send(await business.getAll());
  },
  update: async ({ body }, res) => {
    res.send(await business.updateProduct(body));
  },
  findById: async ({ params: { id } }, res) => {
    res.send(await business.findById(id));
  },
  delete: async ({ body: { id } }, res) => {
    res.send(await business.deleteProduct(id));
  },
});

export default createController;
