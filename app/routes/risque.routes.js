const controller = require("../controllers/risque.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/Risque", controller.createRisque);
app.get("/Risque", controller.findAllRisque);
app.delete("/Risque/:id", controller.deleteRisque);
app.put("/Risque/:id", controller.updateRisque);
app.get("/Risque/:id",controller.findOneRisque);
};