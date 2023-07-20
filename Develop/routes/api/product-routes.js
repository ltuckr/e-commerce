const router = require('express').Router();
const { Product, Category } = require('../../models');

// The `/api/products` endpoint

router.get('/', async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one product by its `id` value
  try {
    const productByID = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Category,
        },
      ],
    });
    if (productByID) {
      res.json(productByID);
    } else {
      res.status(404).json({ error: "No product found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new product
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a product by its `id` value
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "No product with this ID" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ error: "No product with this ID" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
