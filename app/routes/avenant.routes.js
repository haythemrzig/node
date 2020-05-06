const controller = require("../controllers/avenant.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.get("/avenant", controller.findAllAvenant);
app.post("/avenant", controller.createAvenant);
app.put("/avenant/:id", controller.updateAvenant);
app.delete("/avenant/:id", controller.deleteAvenant);


};