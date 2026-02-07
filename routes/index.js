const routes = require("express").Router();

routes.use("/", require("./swagger"));

routes.use("/ideas", require("./ideaRoutes"));
routes.use("/categories", require("./categoryRoutes"));

module.exports = routes;