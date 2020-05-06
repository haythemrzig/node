const controller = require("../controllers/contrat.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/contrat", controller.createContrat);
app.get("/contrat", controller.findAllContrat);
app.get("/contratsGarantie", controller.findAllContratGarantie);

//app.put("/avenant/:id", controller.updateAvenant);
app.get("/contrat/:id", controller.getOnecontrat);
app.get("/voitures/:id", controller.getOneVoiture);
app.put("/contrat/:id", controller.updateContrat);


};