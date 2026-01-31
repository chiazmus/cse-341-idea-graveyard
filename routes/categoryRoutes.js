const router = require("express").Router();
const apiController = require("../controllers/categoryController");

router.get("/", apiController.getAll);

router.post("/", apiController.createCategory);

router.put("/:id", apiController.updateCategory);

router.delete("/:id", apiController.removeCategory);

module.exports = router;
