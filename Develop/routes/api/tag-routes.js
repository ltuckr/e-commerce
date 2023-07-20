const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // include Product data
  try {
    const tagByID = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (tagByID) {
      res.json(tagByID);
    } else {
      res.status(404).json({ error: "tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).json({ error: "tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag) {
      res.json(deletedTag);
    } else {
      res.status(404).json({ error: "tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
