const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.get("/", apiController.getAll);

router.get("/:id", apiController.getSingle);

router.post("/", apiController.createContact);

router.put("/:id", apiController.updateContact);

router.delete("/:id", apiController.removeContact);

module.exports = router;
