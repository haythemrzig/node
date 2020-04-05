const jwt = require("jsonwebtoken");
const db = require("../models");
const FamilleProduit= db.familleproduit;
const Risque = db.risque;
exports.createFamilleProduit = (req, res) => {
    // Save user to database

    Risque.findOne({
        where: {
          id: req.body.Risqueid
        }
      }).then(risque => {
        
      FamilleProduit.create({
      
        code:req.body.code,
        nom: req.body.nom,
        Risqueid:risque.id
   
    })
    .then(() => {
        res.send({ message: "Famille Produit was registered successfully!" });
      })
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
exports.findAllFamilleProduit = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       FamilleProduit.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(familleproduit=>{
        res.send({familleproduit});
   //console.log(t);
     
   
       })      
  };
  exports.updateFamilleProduit = (req, res) => {
    Risque.findOne({
        where: {
          id: req.body.Risqueid
        }
    }).then(risque =>{
    
    FamilleProduit.update(
      { code:req.body.code,
          nom: req.body.nom,
          Risqueid:risque.id
       
      },
    {
      where: { id: req.params.id }
    }).then((familleproduit)=>{
      if (familleproduit)
    { res.send({ message: "Famille Produit was updated successfully!" });} 
    else{
      res.send({ message: "Famille Produit does not exist!" });
    }

    })
     .catch(err=>{
          res.status(500).send({
            message: message.err
          });
        })
    })
     /* .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      })*/
  };
  exports.deleteFamilleProduit=(req,res) => {
   
    FamilleProduit.destroy({ where: { id: req.params.id } 
    }).then(()=>{
     
       res.send({ message: "Famille Produit was deleted successfully!" });
   
    })
    .catch(err =>{
    res.status(500).send({ message: err.message });
  })
};

  
 