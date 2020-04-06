const controller = require("../controllers/familleproduit.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/FamilleProduit", controller.createFamilleProduit);
app.get("/FamilleProduit", controller.findAllFamilleProduit);
app.delete("/FamilleProduit/:id", controller.deleteFamilleProduit);
app.put("/FamilleProduit/:id", controller.updateFamilleProduit);

};