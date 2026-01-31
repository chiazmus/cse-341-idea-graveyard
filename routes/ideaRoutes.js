const router = require("express").Router();
const apiController = require("../controllers/ideaController");

router.get("/", apiController.getAll);

router.get("/:id", apiController.getSingle);

router.post("/", apiController.createIdea);

router.put("/:id", apiController.updateIdea);

router.delete("/:id", apiController.removeIdea);

module.exports = router;
