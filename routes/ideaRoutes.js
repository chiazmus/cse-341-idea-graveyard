const router = require("express").Router();
const { IdeaValidationRules, validate } = require('../utility/validator')
const apiController = require("../controllers/ideaController");

router.get("/", apiController.getAll);

router.get("/:id", apiController.getSingle);

router.post("/", IdeaValidationRules(), validate, apiController.createIdea);

router.put("/:id", IdeaValidationRules(), validate, apiController.updateIdea);

router.delete("/:id", apiController.removeIdea);

module.exports = router;
