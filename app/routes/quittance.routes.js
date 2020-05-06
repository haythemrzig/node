const controller = require("../controllers/quittance.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/quittance", controller.createQuittance);
app.get("/quittance", controller.findAllQuittance);
app.get("/facture", controller.findAllFacture);
app.get("/ligneFacture", controller.findAllLigneFacture);

}