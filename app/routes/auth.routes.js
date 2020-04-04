const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );


  app.post(
    "/api/auth/signupagence",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupagence
  );

  app.post(
    "/api/auth/signuputilisateur",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signuputilisateur
  );

  app.post(
    "/api/auth/signupcompagnie",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupcompagnie
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/getCode/:email", controller.getCode);
  app.put("/api/auth/changePassword/:email", controller.changePassword);

  app.get("/api/auth/getAllUtilisateur", controller.findAllUtilisateur);
  app.delete("/api/auth/deleteUtilisateur/:id", controller.deleteUtilisateur);
  app.put("/api/auth/updateUtilisateur/:id", controller.updateUtilisateur);

  //app.get("/api/auth/getAllAgence", controller.findAllAgence);
  app.get("/api/auth/getAllAgence", controller.findAllAgence);
  app.delete("/api/auth/deleteAgence/:id", controller.deleteAgence);
  app.put("/api/auth/updateAgence/:id", controller.updateAgence);
  app.get("/api/auth/getRoleUtilisateur/:id", controller.getRoleUtilisateur);


  app.get("/api/auth/getOneUtilisateur/:id", controller.getOneUtilisateur);
  app.put("/api/auth/updateProfilUtilisateur/:id", controller.updateProfilUtilisateur);
  app.put("/api/auth/changePasswordProfil/:email", controller.changePasswordProfil);
  app.get("/api/auth/getOneAgence/:id", controller.getOneAgence);
  app.put("/api/auth/updateProfilAgence/:id", controller.updateProfilAgence);
  app.get("/api/auth/getOneAdmin/:id", controller.getOneAdmin);

  app.get("/api/auth/getAllCompagnie", controller.findAllCompagnie);
  app.delete("/api/auth/deleteCompagnie/:id", controller.deleteCompagnie);
  app.put("/api/auth/updateCompagnie/:id", controller.updateCompagnie);
  app.post("/api/auth/create_particulier",
  [verifySignUp.checkDuplicateEmailClientParticulier], controller.createparticulier);
  app.post("/api/auth/create_societe",
  [verifySignUp.checkDuplicateEmailClientSociete], controller.createsociete);
  app.get("/api/auth/getAllClient", controller.findAllClient);
  app.get("/api/auth/getOneParticulier/:id", controller.getOneParticulier);
  app.get("/api/auth/getOneSociete/:id", controller.getOneSociete);
  app.get("/api/auth/checkClient/:id", controller.checkClient);
  app.get("/api/auth/getAllParticulier", controller.findAllParticulier);
  app.get("/api/auth/getAllSociete", controller.findAllSociete);
  app.put("/api/auth/updateParticulier/:id", controller.updateParticulier);
  app.put("/api/auth/updateSociete/:id", controller.updateSociete);

  app.delete("/api/auth/deleteParticulier/:id", controller.deleteParticulier);
  app.delete("/api/auth/deleteSociete/:id", controller.deleteSociete);
  
  app.post("/api/auth/createApporteurParticulier",
  [verifySignUp.checkDuplicateEmailApporteurParticulier], controller.createapporteurparticulier);
  app.post("/api/auth/createApporteurSociete", 
  [verifySignUp.checkDuplicateEmailApporteurSociete],controller.createapporteursociete);
  
  app.get("/api/auth/getAllApporteur", controller.findAllApporteur);
  app.get("/api/auth/getOneApporteurParticulier/:id", controller.getOneApporteurParticulier);
  app.get("/api/auth/getOneApporteurSociete/:id", controller.getOneApporteurSociete);
  app.get("/api/auth/checkApporteur/:id", controller.checkApporteur);
  app.get("/api/auth/getAllApporteurParticulier", controller.findAllApporteurParticulier);
  app.get("/api/auth/getAllApporteurSociete", controller.findAllApporteurSociete);
  app.put("/api/auth/updateApporteurParticulier/:id", controller.updateApporteurParticulier);
  app.put("/api/auth/updateApporteurSociete/:id", controller.updateApporteurSociete);

  app.delete("/api/auth/deleteApporteurParticulier/:id", controller.deleteApporteurParticulier);
  app.delete("/api/auth/deleteApporteurSociete/:id", controller.deleteApporteurSociete);

};
