const router = require("express").Router();
const { CategoryValidationRules, validate } = require('../utility/validator')
const apiController = require("../controllers/categoryController");

router.get("/", apiController.getAll);

router.post("/", CategoryValidationRules(), validate, apiController.createCategory);

router.put("/:id", CategoryValidationRules(), validate, apiController.updateCategory);

router.delete("/:id", apiController.removeCategory);

module.exports = router;
