const controller = require("../controllers/configurationdevis.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/ConfigurationDevis", controller.createConfiguration);
app.get("/ConfigurationDevis", controller.findAllConfiguration);
app.delete("/ConfigurationDevis/:id", controller.deleteConfiguration);
app.put("/ConfigurationDevis/:id", controller.updateConfiguration);

};