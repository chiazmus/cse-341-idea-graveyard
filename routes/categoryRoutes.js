const router = require("express").Router();
const { CategoryValidationRules, validate } = require('../utility/validator')
const apiController = require("../controllers/categoryController");
const {isAuthenticated} = require('../utility/authenticate');

router.get("/", apiController.getAll);

router.post("/", isAuthenticated, CategoryValidationRules(), validate, apiController.createCategory);

router.put("/:id", isAuthenticated, CategoryValidationRules(), validate, apiController.updateCategory);

router.delete("/:id", isAuthenticated, apiController.removeCategory);

module.exports = router;
