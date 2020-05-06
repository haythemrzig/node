const db = require("../models");
const Avenant= db.avenant;


exports.findAllAvenant = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Avenant.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(contrats=>{
        res.send(contrats)
       }).catch(err=>{
        res.status(500).send({
          message: err.message
        });
       })      
  };
exports.createAvenant = (req, res) => {
  
    Avenant.create({
      dateEffet: req.body.dateEffet,
      dateFin: req.body.dateFin,
      montant:req.body.montant,
      contratId:req.body.contratId   
      },
    {
      where: { id: req.params.id }
    }).then(()=>{
    res.send({ message: "Avenant succeess was updated successfully!" });
  
    })
     .catch(err=>{
          res.status(500).send({
            message: err.message
          });
        })
    
   
  };

  exports.updateAvenant = (req, res) => {
  
    Avenant.update({
        dateEffet: req.body.dateEffet,
        dateFin: req.body.dateFin,
        montant:req.body.montant,
        contratId:req.body.contratId
      },
    {
      where: { id: req.params.id }
    }).then((avenant)=>{
        res.send(avenant);
      
    })
     .catch(err=>{
          res.status(500).send({
            message: err.message
          });
        })
    
   
  };
  exports.deleteAvenant=(req,res) => {
   
    Avenant.destroy({ where: { id: req.params.id } 
    }).then((avenant)=>{
      res.send({ message: "Avenant was deleted successfully!" });
      
   
    })
    .catch(err =>{
    res.status(500).send({ message: err.message });
  })
};