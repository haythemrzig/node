const db = require("../models");
const Garantie= db.garantie;

exports.createGarantie = (req, res) => {
    // Save user to database

        
    Garantie.create({

        code:req.body.code,
        nom: req.body.nom,
        niveau: req.body.niveau,
        montantAssure: req.body.montantAssure,
        montantFranchise: req.body.montantFranchise,
        familleproduitId:req.body.familleproduit

   
    })
    .then(() => {
        res.send({ message: "Garantie was registered successfully!" });
      })
   
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
exports.findAllGarantie = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Garantie.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(garantie=>{
        res.send({garantie});
   //console.log(t);
     
   
       })      
  };
  exports.updateGarantie = (req, res) => {
  
    Garantie.update({
        code:req.body.code,
        nom: req.body.nom,
        niveau: req.body.niveau,
        montantAssure: req.body.montantAssure,
        montantFranchise: req.body.montantFranchise,
        familleproduitId:req.body.familleproduit
       
      },
    {
      where: { id: req.params.id }
    }).then(()=>{
    res.send({ message: "Garantie was updated successfully!" });

    })
     .catch(err=>{
          res.status(500).send({
            message: err.message
          });
        })
    
   
  };
  exports.deleteGarantie=(req,res) => {
   
    Garantie.destroy({ where: { id: req.params.id } 
    }).then(()=>{
     
       res.send({ message: "Garantie was deleted successfully!" });
   
    })
    .catch(err =>{
    res.status(500).send({ message: err.message });
  })
};

  
 