const controller = require("../controllers/rendez-vous.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });
app.post("/rendez-vous", controller.create);
app.get("/rendez-vous", controller.findAll);
app.delete("/rendez-vous/:id", controller.delete);
app.put("/rendez-vous/:id", controller.update);
app.get("/rendez-vous/:id", controller.findOne);

};