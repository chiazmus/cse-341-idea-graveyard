const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Ideas']
  try {
    const result = await mongodb.getDatabase().db().collection("Ideas").find();
    result.toArray().then((Ideas) => {
      res.setHeader("Content-Type", "application/json");
      // 200 status means successful btw.
      res.status(200).json(Ideas);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "An error occurred while retrieving data.",
      });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Ideas']
  try {
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
  } catch (err) {
    res
      .status(500)
      .json({
        message: err.message || "An error occurred while retrieving data.",
      });
  }
};

const createIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  try {
    const Idea = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
      lastModifiedBy: req.session.user.displayName,
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
            "An error occured while creating the Idea. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const updateIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  try {
    const IdeaId = new ObjectId(req.params.id);
    const Idea = {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
      lastModifiedBy: req.session.user.displayName,
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
            "An error occured while updating the Idea. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

const removeIdea = async (req, res) => {
  //#swagger.tags=['Ideas']
  try {
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
            "An error occured while removing the Idea. ¯\\_(ツ)_/¯",
        );
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data provided." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createIdea,
  updateIdea,
  removeIdea,
};
