const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Utilisateur = db.utilisateur;
const Compagnie = db.compagnie;
const Client = db.client;
const Particulier = db.particulier;
const Societe = db.societe;

const Apporteur= db.apporteur;
const ApporteurParticulier = db.apporteurparticulier;
const ApporteurSociete = db.apporteursociete;

const Op = db.Op;
var c=0;
var n=0;
var na=0;
var u;
var sessionstorage = require('sessionstorage');
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail', // true for 465, false for other ports
  auth: {
    user: 'hrzig95@gmail.com', // generated ethereal user
    pass: 'Kingof2016' // generated ethereal password
  }
});
Utilisateur.count({ raw: true}).then(data=>{
n=data;
});

Agence.count({ raw: true}).then(data=>{
  na=data;
  });

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // User role 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signupagence = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "agence was registered successfully!" });
          });
        });
      } else {
        // User role 2
        user.setRoles([2]).then(() => {
          Agence.create({
            Userid: user.id,
            nom:req.body.nom,
            tel:req.body.tel,
            siteWeb:req.body.siteWeb

                      })
          res.send({ message: "agence was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllAgence = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Agence.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(agence=>{
       let t=[];
       agence.forEach(x => {
         t.push(x.Userid);
       });
 //console.log(t);
       User.findAll({ raw: true,
         order: [['created_at', 'DESC']],
        where: 
         { id: { [Op.in]: t } }
         
         ,}).then(user=>{
         //u=JSON.stringify(element+data)
         res.send({user,agence});
         })
 
     })
         
            
          
     
 };

 exports.updateAgence = (req, res) => {
  const id = req.params.id;

  User.update(
    { username: req.body.username,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password, 8)
    },
  {
    where: { id: id }
  })
    .then(() => {
      Agence.update(
        {
            nom:req.body.nom,
            tel: req.body.tel,
            siteWeb: req.body.siteWeb
        },
        {
          where: { Userid: id }
        }
      ).then(()=>{
        res.send({ message: "utlisateur was deleted successfully!" });

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


 exports.deleteAgence=(req,res,next) => {
  Agence.destroy({ where: { Userid: req.params.id } }).then(()=>{
    User.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "utlisateur was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
}

exports.signuputilisateur = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "utilisateur was registered successfully!" });
          });
        });
      } else {
        // User role 2
        user.setRoles([1]).then(() => {
          Utilisateur.create({
            Userid: user.id,
            nom:req.body.nom,
            prenom:req.body.prenom,
            date_naissance:req.body.date_naissance,
            cin:req.body.cin,
            ville:req.body.ville,
            codePostal:req.body.codePostal,
            role:req.body.role,
            tel: req.body.tel,
            autreTel:req.body.autreTel

                      })
          res.send({ message: "utlisateur was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        //sessionstorage.setItem('id', user.id);
        //var id = sessionstorage.getItem('id');

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.findAllUtilisateur = (req, res,next) => {
 // const title = req.query.title;
  //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Utilisateur.findAll({ raw: true,
      order: [['created_at', 'DESC']]
    }).then(utilisateur=>{
      let t=[];
      utilisateur.forEach(x => {
        t.push(x.Userid);
      });
//console.log(t);
      User.findAll({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { id: { [Op.in]: t } }
        
        ,}).then(user=>{
        //u=JSON.stringify(element+data)
        res.send({user,utilisateur});
        })

    })
        
           
         
    
};

exports.deleteUtilisateur=(req,res,next) => {
  Utilisateur.destroy({ where: { Userid: req.params.id } }).then(()=>{
    User.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "utlisateur was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
}


exports.updateUtilisateur = (req, res) => {
  const id = req.params.id;

  User.update(
    { username: req.body.username,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password, 8)
    },
  {
    where: { id: id }
  })
    .then(() => {
      Utilisateur.update(
        {
            nom:req.body.nom,
            prenom:req.body.prenom,
            date_naissance:req.body.date_naissance,
            cin:req.body.cin,
            ville:req.body.ville,
            codePostal:req.body.codePostal,
            role:req.body.role,
            tel: req.body.tel,
            autreTel:req.body.autreTel
        },
        {
          where: { Userid: id }
        }
      ).then(()=>{
        res.send({ message: "utlisateur was deleted successfully!" });

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating utilisateur with id=" + id
      });
    });
};


exports.getRoleUtilisateur = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   const id = req.params.id;
   Utilisateur.findOne({
    where: { Userid: id },
    attributes: ['role']
  }).then(role => {
    res.status(200).send(role);
  }).catch(err => {
    res.status(500).send({
      'error': err
    });
  })

         
            
          
     
 };

 exports.getCode = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ message: "Email Not found." });
      }

      let token = jwt.sign({ email: user.email }, config.secret, {
        expiresIn: 120 // 24 hours
      });
      sessionstorage.setItem('token', token);
       transporter.sendMail({
        from: 'hrzig95@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Votre Code est ", // Subject line
        text: token // plain text body   
      });
      return res.status(200).send({ code: token });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };

  exports.changePassword = (req, res) => {
      const email = req.params.email;
      var token = sessionstorage.getItem('token');
      if(token!=req.body.token){
        res.send({message: "code invalid"})
        }else{
          User.update(
            {
              password:bcrypt.hashSync(req.body.password, 8)
            },
          {
            where: { email: email }
          }).then(data=>{
            res.send({message:"success"})
          })
        }
      };

  exports.changePasswordProfil = (req, res) => {
      
        User.findOne({
          where: {
            email: req.params.email,
          }
        }).then(user=>{
          let passwordIsValid = bcrypt.compareSync(
            req.body.ancienPassword,
            user.password
          );
    
          if (!passwordIsValid) {
            res.status(500).send({ message: "Password Invalid"});          }
          else
          {

          
         
            User.update(
              {
                password:bcrypt.hashSync(req.body.nouveauPassword, 8)
              },
            {
              where: { email: req.params.email }
            }).then(data=>{
              res.send({message:"success"})
            })
          }
          
        })
            
          
  };


  exports.getOneUtilisateur = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Utilisateur.findOne({ raw: true,
         where:{Userid:req.params.id} 
       }).then(utilisateur=>{
        
         User.findOne({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: req.params.id }
           
           ,}).then(user=>{
           //u=JSON.stringify(element+data)
           res.send({
             id:user.Userid,
             email:user.email,
             username:user.username,
             nom:utilisateur.nom,
             prenom:utilisateur.prenom,
             cin:utilisateur.cin,
             ville:utilisateur.ville,
             codePostal:utilisateur.codePostal,
             tel:utilisateur.tel,
             autreTel:utilisateur.autreTel,
             date_naissance:utilisateur.date_naissance
           });
           })
   
       })
           
              
            
       
   };


   exports.updateProfilUtilisateur = (req, res) => {
    const id = req.params.id;
  
    User.update(
      { username: req.body.username,
        email:req.body.email
      },
    {
      where: { id: id }
    })
      .then(() => {
        Utilisateur.update(
          {
              nom:req.body.nom,
              prenom:req.body.prenom,
              date_naissance:req.body.date_naissance,
              cin:req.body.cin,
              ville:req.body.ville,
              codePostal:req.body.codePostal,
              role:req.body.role,
              tel: req.body.tel,
              autreTel:req.body.autreTel
          },
          {
            where: { Userid: id }
          }
        ).then(()=>{
          res.send({ message: "success" });
  
        }).catch(()=>{
          res.status(500).send({
            message: "Error "
          });
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.getOneAgence = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Agence.findOne({ raw: true,
         where:{Userid:req.params.id} 
       }).then(agence=>{
        
         User.findOne({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: req.params.id }
           
           ,}).then(user=>{
           //u=JSON.stringify(element+data)
           res.send({
             id:user.Userid,
             email:user.email,
             username:user.username,
             nom:agence.nom,
             siteWeb:agence.siteWeb,
             tel:agence.tel    
             });
           })
   
       })
           
              
            
       
   };

   exports.updateProfilAgence = (req, res) => {
    const id = req.params.id;
  
    User.update(
      { username: req.body.username,
        email:req.body.email
      },
    {
      where: { id: id }
    })
      .then(() => {
        Agence.update(
          {
              nom:req.body.nom,
              siteWeb:req.body.siteWeb,
              tel:req.body.tel
          },
          {
            where: { Userid: id }
          }
        ).then(()=>{
          res.send({ message: "success" });
  
        }).catch(()=>{
          res.status(500).send({
            message: "Error "
          });
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.getOneAdmin = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
     User.findOne({ raw: true,
      order: [['created_at', 'DESC']],
     where: 
      { id: req.params.id }
      
      ,}).then(user=>{
      //u=JSON.stringify(element+data)
      res.send({
        id:user.Userid,
        email:user.email,
        username:user.username    
        });
      })
           
              
            
       
   };


   exports.signupcompagnie = (req, res) => {
    // Save user to database
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "Compagnie was registered successfully!" });
            });
          });
        } else {
          // User role 2
          user.setRoles([3]).then(() => {
            Compagnie.create({
              Userid: user.id,
              nom:req.body.nom,
              tel:req.body.tel,
              siteWeb:req.body.siteWeb,
              specialite:req.body.specialite,
              status:req.body.status
  
                        })
            res.send({ message: "Compagnie was registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.findAllCompagnie = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Compagnie.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(compagnie=>{
         let t=[];
         compagnie.forEach(x => {
           t.push(x.Userid);
         });
   //console.log(t);
         User.findAll({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: { [Op.in]: t } }
           
           ,}).then(user=>{
           //u=JSON.stringify(element+data)
           res.send({user,compagnie});
           })
   
       })
           
              
            
       
   };

   exports.deleteCompagnie=(req,res,next) => {
    Compagnie.destroy({ where: { Userid: req.params.id } }).then(()=>{
      User.destroy({ where: { id: req.params.id } }).then(()=>{
        res.send({ message: "Compagnie was deleted successfully!" });
      })
    }).catch(err =>{
      res.status(500).send({ message: err.message });
  
    })
  }

  exports.updateCompagnie = (req, res) => {
    const id = req.params.id;
  
    User.update(
      { username: req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
      },
    {
      where: { id: id }
    })
      .then(() => {
        Compagnie.update(
          {
              nom:req.body.nom,
              tel: req.body.tel,
              siteWeb: req.body.siteWeb,
              specialite:req.body.specialite,
              status:req.body.status
          },
          {
            where: { Userid: id }
          }
        ).then(()=>{
          res.send({ message: "Compagnie was deleted successfully!" });
  
        }).catch(()=>{
          res.status(500).send({
            message: "Error "
          });
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.createparticulier = (req, res) => {
    // Save user to database
    Client.create({
      nom: req.body.nomP,
      email: req.body.emailP,
      adresse: req.body.adresseP,
      tel: req.body.telP,
      mobile: req.body.mobileP

    })
      .then((client) => {
        
          // User role 2
            Particulier.create({
              Clientid: client.id,
              cin:req.body.cin
                        })
            res.send({ message: "Particulier was registered successfully!" });
         
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.createapporteurparticulier = (req, res) => {
    // Save user to database
    Apporteur.create({
      nom: req.body.nomP,
      email: req.body.emailP,
      adresse: req.body.adresseP,
      tel: req.body.telP,
      mobile: req.body.mobileP

    })
      .then((apporteur) => {
        
          // User role 2
            ApporteurParticulier.create({
             Apporteurid: apporteur.id,
              cin:req.body.cin
                        })
            res.send({ message: "Particulier was registered successfully!" });
         
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.createsociete = (req, res) => {
    // Save user to database
    Client.create({
      nom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      mobile: req.body.mobile

    })
      .then((client) => {
        
          // User role 2
            Societe.create({
              Clientid: client.id,
              raison_sociale:req.body.raison_sociale,
              fax:req.body.fax,
              numero_registre:req.body.numero_registre,
              date_creation:req.body.date_creation,
              siteWeb:req.body.siteWeb
                        })
            res.send({ message: "Societe was registered successfully!" });
         
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.createapporteursociete = (req, res) => {
    // Save user to database
    Apporteur.create({
      nom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      mobile: req.body.mobile

    })
      .then((apporteur) => {
        
          // User role 2
            ApporteurSociete.create({
              Apporteurid: apporteur.id,
              raison_sociale:req.body.raison_sociale,
              fax:req.body.fax,
              numero_registre:req.body.numero_registre,
              date_creation:req.body.date_creation,
              siteWeb:req.body.siteWeb
                        })
            res.send({ message: "Societe was registered successfully!" });
         
        
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.findAllClient = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Client.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(client=>{
         let t=[];
         client.forEach(x => {
           t.push(x.id);
         });
   //console.log(t);
         Particulier.findAll({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { Clientid: { [Op.in]: t } }
           
           ,}).then(particulier=>{
            Societe.findAll({ raw: true,
              order: [['created_at', 'DESC']],
             where: 
              { Clientid: { [Op.in]: t } }
              
              ,}).then(societe=>{
                res.send({client,particulier,societe});

              })

           })
   
       })
           
              
            
       
   };
   exports.findAllApporteur = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
     Apporteur.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(apporteur=>{
         let t=[];
         apporteur.forEach(x => {
           t.push(x.id);
         });
   //console.log(t);
       ApporteurParticulier.findAll({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { Apporteurid: { [Op.in]: t } }
           
           ,}).then(apporteurparticulier=>{
            ApporteurSociete.findAll({ raw: true,
              order: [['created_at', 'DESC']],
             where: 
              { Apporteurid: { [Op.in]: t } }
              
              ,}).then(apporteursociete=>{
                res.send({apporteur,apporteurparticulier,apporteursociete});

              })

           })
   
       })
           
              
            
       
   };
   exports.getOneParticulier = (req, res,next) => {
    
       Particulier.findOne({ raw: true,
         where:{Clientid:req.params.id} 
       }).then(particulier=>{
        
         Client.findOne({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: req.params.id }
           
           ,}).then(client=>{
           //u=JSON.stringify(element+data)
           res.send({
             id:client.id,
             email:client.email,
             nom:client.nom,
             adresse:client.adresse,  
             tel:client.tel,    
             mobile:client.mobile,   
             cin:particulier.cin    
             });
           })
   
       })
           
              
            
       
   };
   exports.getOneApporteurParticulier = (req, res,next) => {
    
    ApporteurParticulier.findOne({ raw: true,
      where:{Apporteurid:req.params.id} 
    }).then(apporteurparticulier=>{
     
      Apporteur.findOne({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { id: req.params.id }
        
        ,}).then(apporteur=>{
        //u=JSON.stringify(element+data)
        res.send({
          id:apporteur.id,
          email:apporteur.email,
          nom:apporteur.nom,
          adresse:apporteur.adresse,  
          tel:apporteur.tel,    
          mobile:apporteur.mobile,   
          cin:apporteurparticulier.cin    
          });
        })

    })
        
           
         
    
};
   exports.getOneSociete = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Societe.findOne({ raw: true,
         where:{Clientid:req.params.id} 
       }).then(societe=>{
        
         Client.findOne({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: req.params.id }
           
           ,}).then(client=>{
           //u=JSON.stringify(element+data)
           res.send({
             id:client.id,
             email:client.email,
             nom:client.nom,
             adresse:client.adresse,  
             tel:client.tel,    
             mobile:client.mobile,
             raison_sociale:societe.raison_sociale,
             date_creation:societe.date_creation,
             fax:societe.fax,
             siteWeb:societe.siteWeb,
             numero_registre:societe.numero_registre    
             });
           })
   
       })
           
              
            
       
   };
   exports.getOneApporteurSociete = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
     ApporteurSociete.findOne({ raw: true,
         where:{Apporteurid:req.params.id} 
       }).then(apporteursociete=>{
        
        Apporteur.findOne({ raw: true,
           order: [['created_at', 'DESC']],
          where: 
           { id: req.params.id }
           
           ,}).then(apporteur=>{
           //u=JSON.stringify(element+data)
           res.send({
             id:apporteur.id,
             email:apporteur.email,
             nom:apporteur.nom,
             adresse:apporteur.adresse,  
             tel:apporteurt.tel,    
             mobile:apporteur.mobile,
             raison_sociale:apporteursociete.raison_sociale,
             date_creation:apporteursociete.date_creation,
             fax:apporteursociete.fax,
             siteWeb:societe.siteWeb,
             numero_registre:apporteursociete.numero_registre    
             });
           })
   
       })
           
              
            
       
   };
   exports.checkClient = (req, res,next) => {
    
    Client.findOne({ raw: true,
      where:{id:req.params.id} 
    }).then(client=>{
     
      Particulier.findOne({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { Clientid: req.params.id }
        
        ,}).then(particulier=>{
          if(particulier)
        res.send({client:"particulier"});
        })

        Societe.findOne({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { Clientid: req.params.id }
        
        ,}).then(societe=>{
          if(societe)
        res.send({client:"societe"});
        })
    })
        
           
         
    
};
   exports.checkApporteur = (req, res,next) => {
    
    Apporteur.findOne({ raw: true,
      where:{id:req.params.id} 
    }).then(apporteur=>{
     
      ApporteurParticulier.findOne({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { Apporteurid: req.params.id }
        
        ,}).then(apporteurparticulier=>{
          if(apporteurparticulier)
        res.send({apporteur:"particulier"});
        })

        Societe.findOne({ raw: true,
        order: [['created_at', 'DESC']],
       where: 
        { Apporteurid: req.params.id }
        
        ,}).then(societe=>{
          if(apporteursociete)
        res.send({apporteur:"societe"});
        })
    })
        
           
         
    
};

exports.findAllParticulier = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Particulier.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(particulier=>{
       let t=[];
       particulier.forEach(x => {
         t.push(x.Clientid);
       });
 //console.log(t);
       Client.findAll({ raw: true,
         order: [['created_at', 'DESC']],
        where: 
         { id: { [Op.in]: t } }
         
         ,}).then(client=>{
         //u=JSON.stringify(element+data)
         res.send({client,particulier});
         })
 
     })
         
            
          
     
 };
 exports.findAllApporteurParticulier = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     ApporteurParticulier.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(apporteurparticulier=>{
       let t=[];
       apporteurparticulier.forEach(x => {
         t.push(x.Apporteurid);
       });
 //console.log(t);
     Apporteur.findAll({ raw: true,
         order: [['created_at', 'DESC']],
        where: 
         { id: { [Op.in]: t } }
         
         ,}).then(apporteur=>{
         //u=JSON.stringify(element+data)
         res.send({apporteur,apporteurparticulier});
         })
 
     })
         
            
          
     
 };
 exports.findAllSociete = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Societe.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(societe=>{
       let t=[];
       societe.forEach(x => {
         t.push(x.Clientid);
       });
 //console.log(t);
       Client.findAll({ raw: true,
         order: [['created_at', 'DESC']],
        where: 
         { id: { [Op.in]: t } }
         
         ,}).then(client=>{
         //u=JSON.stringify(element+data)
         res.send({client,societe});
         })
 
     })
         
            
          
     
 };
 exports.findAllApporteurSociete = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
   ApporteurSociete.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(apporteursociete=>{
       let t=[];
       apporteursociete.forEach(x => {
         t.push(x.Apporteurid);
       });
 //console.log(t);
      Apporteur.findAll({ raw: true,
         order: [['created_at', 'DESC']],
        where: 
         { id: { [Op.in]: t } }
         
         ,}).then(apporteur=>{
         //u=JSON.stringify(element+data)
         res.send({apporteur,apporteursociete});
         })
 
     })
         
            
          
     
 };
 exports.updateParticulier = (req, res) => {
  const id = req.params.id;

  Client.update(
    { 
      nom: req.body.nomP,
      email: req.body.emailP,
      adresse: req.body.adresseP,
      tel: req.body.telP,
      mobile: req.body.mobileP
    },
  {
    where: { id: id }
  })
    .then(() => {
      Particulier.update(
        {
          cin:req.body.cin
        },
        {
          where: { Clientid: id }
        }
      ).then(()=>{
        res.send({ message: "Particulier was updated successfully!" });

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateApporteurParticulier = (req, res) => {
  const id = req.params.id;

  Apporteur.update(
    { 
      nom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      mobile: req.body.mobile
    },
  {
    where: { id: id }
  })
    .then(() => {
      ApporteurParticulier.update(
        {
          cin:req.body.cin
        },
        {
          where: { Apporteurid: id }
        }
      ).then(()=>{
        res.send({ message: "Particulier was updated successfully!" });

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateSociete = (req, res) => {
  const id = req.params.id;

  Client.update(
    { 
      nom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      mobile: req.body.mobile
    },
  {
    where: { id: id }
  })
    .then(() => {
      Societe.update(
        {
          raison_sociale:req.body.raison_sociale,
          fax:req.body.fax,
          numero_registre:req.body.numero_registre,
          date_creation:req.body.date_creation,
          siteWeb:req.body.siteWeb
          },
        {
          where: { Clientid: id }
        }
      ).then((societe)=>{
        res.send({ message: "Societe was updated successfully!", societe});

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.updateApporteurSociete = (req, res) => {
  const id = req.params.id;

  Apporteur.update(
    { 
      nom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      mobile: req.body.mobile
    },
  {
    where: { id: id }
  })
    .then(() => {
      ApporteurSociete.update(
        {
          raison_sociale:req.body.raison_sociale,
          fax:req.body.fax,
          numero_registre:req.body.numero_registre,
          date_creation:req.body.date_creation,
          siteWeb:req.body.siteWeb
          },
        {
          where: { Apporteurid: id }
        }
      ).then(()=>{
        res.send({ message: "Societe was updated successfully!" });

      }).catch(()=>{
        res.status(500).send({
          message: "Error "
        });
      })
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
exports.deleteParticulier=(req,res,next) => {
  Particulier.destroy({ where: { Clientid: req.params.id } }).then(()=>{
    Client.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "particulier was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
};
exports.deleteApporteurParticulier=(req,res,next) => {
  ApporteurParticulier.destroy({ where: { Apporteurid: req.params.id } }).then(()=>{
    Apporteur.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "particulier was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
};
exports.deleteSociete=(req,res,next) => {
  Societe.destroy({ where: { Clientid: req.params.id } }).then(()=>{
    Client.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "societe was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
};
exports.deleteApporteurSociete=(req,res,next) => {
  ApporteurSociete.destroy({ where: { Apporteurid: req.params.id } }).then(()=>{
    Apporteur.destroy({ where: { id: req.params.id } }).then(()=>{
      res.send({ message: "societe was deleted successfully!" });
    })
  }).catch(err =>{
    res.status(500).send({ message: err.message });

  })
};

