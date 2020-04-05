const controller = require("../controllers/familleproduit.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/api/auth/createFamilleProduit", controller.createFamilleProduit);
app.get("/api/auth/getAllFamilleProduit", controller.findAllFamilleProduit);
app.delete("/api/auth/deleteFamilleProduit/:id", controller.deleteFamilleProduit);
app.put("/api/auth/updateFamilleProduit/:id", controller.updateFamilleProduit);

};