const jwt = require("jsonwebtoken");
const db = require("../models");
const Risque= db.risque;
exports.createRisque = (req, res) => {
    // Save user to database
    Risque.create({
      code:req.body.code,
      nom: req.body.nom
   
    })
    .then(() => {
        res.send({ message: "Risque was registered successfully!" });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
exports.findAllRisque = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Risque.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(risque=>{
        res.send({risque});
   //console.log(t);
     
   
       })      
  };
  exports.updateRisque = (req, res) => {
    const id = req.params.id;
  
  Risque.update(
      {  code:req.body.code,
         nom: req.body.nom,
       
      },
    {
      where: { id: req.params.id }
    }).then((risque)=>{
      if(risque)
    { res.send({ message: "Risque was updated successfully!" });} 
    else{
      res.send({ message: "Risque does not exist!" });
    }

    })
     .catch(err=>{
          res.status(500).send({
            message: message.err
          });
        })
   
     /* .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      })*/
  };
  exports.deleteRisque=(req,res) => {
   
      Risque.destroy({ where: { id: req.params.id } 
      }).then(()=>{
       
         res.send({ message: "Risque was deleted successfully!" });
     
      })
      .catch(err =>{
      res.status(500).send({ message: err.message });
    })
  };
  
 