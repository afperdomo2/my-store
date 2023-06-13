const categoriesRouter = require("./categoriesRouter");
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");

const routerApi = (app) => {
  app.get("/", (req, res) => {
    res.send("Servidor en express");
  });
  app.get("/home", (req, res) => {
    res.send("Home");
  });
  app.use("/categories", categoriesRouter);
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);
};

module.exports = routerApi;
