const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0] === 1) {
      res.json({ message: "Tag updated successfully" });
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedTag) {
      res.json({ message: "Tag deleted successfully" });
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
