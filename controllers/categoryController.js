const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Categories']
  const result = await mongodb.getDatabase().db().collection("Categories").find();
  result.toArray().then((Categories) => {
    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(Categories);
  });
};

const createCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  const Category = {
    name: req.body.name,
    description: req.body.description,
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
          "An error occured while creating the Category. ¯\\_(ツ)_/¯"
      );
};

const updateCategory = async (req, res) => {
  //#swagger.tags=['Categories']
  const CategoryId = new ObjectId(req.params.id);
  const Category = {
    name: req.body.name,
    description: req.body.description,
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
          "An error occured while updating the Category. ¯\\_(ツ)_/¯"
      );
};

const removeCategory = async (req, res) => {
  //#swagger.tags=['Categories']
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
          "An error occured while removing the Category. ¯\\_(ツ)_/¯"
      );
};

module.exports = {
  getAll,
  createCategory,
  updateCategory,
  removeCategory,
};
