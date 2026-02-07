const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Categories']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .find();
    result.toArray().then((Categories) => {
      res.setHeader("Content-Type", "application/json");
      // 200 status means successful btw.
      res.status(200).json(Categories);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "An error occurred while retrieving data.",
      });
  }
};

const createCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  try {
    const Category = {
      name: req.body.name,
      description: req.body.description,
      lastModifiedBy: req.session.user.displayName,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .insertOne(Category);
    if (response.acknowledged) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while creating the Category. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const updateCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  try {
    const CategoryId = new ObjectId(req.params.id);
    const Category = {
      name: req.body.name,
      description: req.body.description,
      lastModifiedBy: req.session.user.displayName,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .replaceOne({ _id: CategoryId }, Category);
    if (response.modifiedCount > 0) res.status(201).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while updating the Category. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const removeCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  try {
    const CategoryId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("Categories")
      .deleteOne({ _id: CategoryId });
    if (response.deletedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error ||
            "An error occured while removing the Category. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

module.exports = {
  getAll,
  createCategory,
  updateCategory,
  removeCategory,
};
