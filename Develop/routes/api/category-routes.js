const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoryByID = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (categoryByID) {
      res.json(categoryByID);
    } else {
      res.status(404).json({ error: "No category found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (error) {
    res.status(502).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
