const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const multer = require('multer');
const app = express();
const bcrypt = require("bcryptjs");



const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;


db.sequelize.sync().then(() => {
 //initial(); // Just use it in development, at the first time execution!. Delete it in production
});

//upload image
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      //cb(null, './uploads');
      
      cb(null, 'D:/PFE/front/assurance/src/assets/app-assets/files');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

var upload = multer({ storage: storage })



app.post('/single', upload.single('image'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
})







// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/risque.routes")(app);
require("./app/routes/familleproduit.routes")(app);
require("./app/routes/garantie.routes")(app);
require("./app/routes/configurationdevis.routes")(app);
require("./app/routes/rendez-vous.routes")(app);
require("./app/routes/devis.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/contrat.routes")(app);
require("./app/routes/avenant.routes")(app);
require("./app/routes/quittance.routes")(app);


// set port, listen for requests
//const PORT = config.PORT;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production

function initial() {
  Role.create({
    id: 1,
    name: "utilisateur"
  });

  Role.create({
    id: 2,
    name: "agence"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "compagnie"
  });
  User.create({
    username: "admin",
    email: "hrzig95@gmail.com",
    password: bcrypt.hashSync("admin", 8)
  }).then(user=>{
    user.setRoles([3]);
  });
   
  
  
}
