const routes = require("express").Router();

routes.use("/", require("./swagger"));

routes.get("/", (req, res) => {
  //#swagger.tags=['Hello World']
  res.send("Hello World");
});

routes.use("/ideas", require("./ideaRoutes"));
routes.use("/categories", require("./categoryRoutes"));

module.exports = routes;