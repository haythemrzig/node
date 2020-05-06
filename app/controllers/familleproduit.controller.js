const jwt = require("jsonwebtoken");
const db = require("../models");
const FamilleProduit= db.familleproduit;

exports.createFamilleProduit = (req, res) => {
    // Save user to database

        
    FamilleProduit.create({
      
        image:req.body.image,
        nom: req.body.nom,
        risqueId:req.body.risque
   
    })
    .then(() => {
        res.send({ message: "Famille Produit was registered successfully!" });
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
  
    FamilleProduit.update({
       image:req.body.image,
          nom: req.body.nom,
          risqueId:req.body.risque
       
      },
    {
      where: { id: req.params.id }
    }).then(()=>{
    res.send({ message: "Famille Produit was updated successfully!" });

    })
     .catch(err=>{
          res.status(500).send({
            message: err.message
          });
        })
    
   
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

  
 