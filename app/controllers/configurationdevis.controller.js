const jwt = require("jsonwebtoken");
const db = require("../models");
const ConfigurationDevis= db.configurationdevis;

exports.createConfiguration = (req, res) => {
    // Save user to database

        
    ConfigurationDevis.create({
      
        code:req.body.code,
        questionnaire: req.body.questionnaire,
        risqueId:req.body.risque
   
    })
    .then(() => {
        res.send({ message: "Configuration was registered successfully!" });
      })
   
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
exports.findAllConfiguration = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       ConfigurationDevis.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(configurationdevis=>{
        res.send({configurationdevis});
   //console.log(t);
     
   
       })      
  };
  exports.updateConfiguration = (req, res) => {
  
    ConfigurationDevis.update({
        code:req.body.code,
        questionnaire: req.body.questionnaire,
        risqueId:req.body.risque
       
      },
    {
      where: { id: req.params.id }
    }).then(()=>{
    res.send({ message: "Configuration was updated successfully!" });

    })
     .catch(err=>{
          res.status(500).send({
            message: err.message
          });
        })
    
   
  };
  exports.deleteConfiguration=(req,res) => {
   
    ConfigurationDevis.destroy({ where: { id: req.params.id } 
    }).then(()=>{
     
       res.send({ message: "Configuration was deleted successfully!" });
   
    })
    .catch(err =>{
    res.status(500).send({ message: err.message });
  })
};

  
 