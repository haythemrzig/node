const controller = require("../controllers/devis.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/devis", controller.createConfiguration);
app.get("/devis", controller.findAllDevis);
app.get("/voitures", controller.findAllVoiture);
app.get("/devisGarantie", controller.findAllDevisGarantie);
app.delete("/devis/:id", controller.deleteDevis);


};