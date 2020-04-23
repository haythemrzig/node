const controller = require("../controllers/file.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
  
      next();
    });

   
app.get("/file", controller.listeFile);
app.delete("/file/:filePath", controller.deleteFile);
app.post("/file",controller.createFile);
app.get("/fileTraite", controller.listeFileTraite);
app.put("/fileTraite/:id",controller.update);
app.delete("/fileTraite/:id", controller.delete);


};