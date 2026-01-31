const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Ideas']
  const result = await mongodb.getDatabase().db().collection("Ideas").find();
  result.toArray().then((Ideas) => {
    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(Ideas);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Ideas']
  const IdeaId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("Ideas")
    .find({ _id: IdeaId });
  result.toArray().then((Ideas) => {
    res.setHeader("Content-Type", "application/json");
    // 200 status means successful btw.
    res.status(200).json(Ideas[0]);
  });
};

const createIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  const Idea = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Ideas")
    .insertOne(Idea);
  if (response.acknowledged) res.status(201).send();
  else
    res
      .status(500)
      .json(
        response.error ||
          "An error occured while creating the Idea. ¯\\_(ツ)_/¯"
      );
};

const updateIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  const IdeaId = new ObjectId(req.params.id);
  const Idea = {
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Ideas")
    .replaceOne({ _id: IdeaId }, Idea);
  if (response.modifiedCount > 0) res.status(201).send();
  else
    res
      .status(500)
      .json(
        response.error ||
          "An error occured while updating the Idea. ¯\\_(ツ)_/¯"
      );
};

const removeIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  const IdeaId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("Ideas")
    .deleteOne({ _id: IdeaId });
  if (response.deletedCount > 0) res.status(204).send();
  else
    res
      .status(500)
      .json(
        response.error ||
          "An error occured while removing the Idea. ¯\\_(ツ)_/¯"
      );
};

module.exports = {
  getAll,
  getSingle,
  createIdea,
  updateIdea,
  removeIdea,
};
