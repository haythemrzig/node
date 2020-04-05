const controller = require("../controllers/risque.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/api/auth/createRisque", controller.createRisque);
app.get("/api/auth/getAllRisque", controller.findAllRisque);
app.delete("/api/auth/deleteRisque/:id", controller.deleteRisque);
app.put("/api/auth/updateRisque/:id", controller.updateRisque);

};