const db = require("../models");
const Rendezvous= db.rendezvous;


exports.create = (req, res) => {
    
    const rendezvous = {
      
        description: req.body.description,
        date: req.body.date,
        lieu:req.body.lieu,
        clientId:req.body.client        
    };
  
    // Save Tutorial in the database
    Rendezvous.create(rendezvous)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
};

exports.findAll = (req, res) => {
   
      Rendezvous.findAll({ raw: true,
        order: [['created_at', 'DESC']]
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });
};

exports.delete= (req, res) => {
    const id = req.params.id;
    Rendezvous.destroy({
       where: { id: id }
     })
       .then(() => {
        
           res.send({
             message: "Rendez-vous was deleted successfully!"
           });
        
       })
       .catch(err => {
         res.status(500).send({
           message: err
         });
       });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Rendezvous.update(req.body, {
    where: { id: id }
  })
    .then(() => {
        res.send({
          message: "Tutorial was updated successfully."
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Rendezvous.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });
};


  
 