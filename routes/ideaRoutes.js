const router = require("express").Router();
const { IdeaValidationRules, validate } = require('../utility/validator')
const apiController = require("../controllers/ideaController");
const {isAuthenticated} = require('../utility/authenticate.js');

router.get("/", apiController.getAll);

router.get("/:id", apiController.getSingle);

router.post("/", isAuthenticated, IdeaValidationRules(), validate, apiController.createIdea);

router.put("/:id", isAuthenticated, IdeaValidationRules(), validate, apiController.updateIdea);

router.delete("/:id", isAuthenticated, apiController.removeIdea);

module.exports = router;
