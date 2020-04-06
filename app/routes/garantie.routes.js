const controller = require("../controllers/garantie.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/garantie", controller.createGarantie);
app.get("/garantie", controller.findAllGarantie);
app.delete("/garantie/:id", controller.deleteGarantie);
app.put("/garantie/:id", controller.updateGarantie);

};