const db = require("../models");
const Devis= db.devis;
const Voiture=db.voiture;
const Configurationdevis=db.configurationdevis;
const Reponse=db.Reponse;
const DevisGarantie=db.devisGarantie;
var t=new Array(); 
var chnom=new Array();
var chmontant=new Array();
var ch="";
exports.createConfiguration = (req, res) => {
  
   
  


    Voiture.create({
        anneeFab:req.body.anneeFab,
        modele: req.body.modele,
        immatriculation:req.body.immatriculation,
        dateAcquisition: req.body.dateAcquisition,
        adresse:req.body.adresse,
        marque: req.body.marque,
        trims:req.body.trims,
        carburant: req.body.carburant,
        dateMiseEnCirculation:req.body.dateMiseEnCirculation,
        codePostal: req.body.codePostal,
    }).then((voiture)=>{


        Devis.create({
      
            numeroPolice:req.body.numeroPolice,
            numeroPoliceExterne: req.body.numeroPoliceExterne,
            dateEffet:req.body.dateEffet,
            dateFin: req.body.dateFin,
            echeancePrincipale:req.body.echeancePrincipale,
            modeFractionnement: req.body.modeFractionnement,
            delaiPreavis:req.body.delaiPreavis,
            montantAgence: req.body.montantAgence,
            montantTTC:req.body.montantTTC,
            risqueId:req.body.risque,
            familleproduitId:req.body.famille,
            clientId:req.body.client,
            voitureId:voiture.id,
            compagnieId:req.body.compagnie,
            apporteurId:req.body.apporteur
        })
        .then((devis) => {
             for (var key in req.body) 
        {
        if(key.indexOf('idG')> -1)
        {
            garantie={
                garantie_id:req.body[key],
                devis_id:devis.id
                    }
             t.push(garantie);
        }
         }

         DevisGarantie.bulkCreate(t).then((garantie)=>{
          //  res.send(garantie);
          t=[];
        }).catch(err=>{
            res.status(500).send({ message: err.message });
        
        });




           Configurationdevis.bulkCreate([{
              questionnaire:req.body.q1,
              risqueId:req.body.risque, 
           },
         
           {
            questionnaire:req.body.q2,
            risqueId:req.body.risque, 
         },
         {
            questionnaire:req.body.q3,
            risqueId:req.body.risque, 
         }
        ]
        
        ).then((data)=>{
          for (var key in req.body) 
          {
          if(key.indexOf('nomS')> -1)
          {
              chnom.push(req.body[key]);      
            }
          }
         // ch.push(sinistre);   
         
           for (var key in req.body) 
          {
           if(key.indexOf('montantS')> -1){
            chmontant.push(req.body[key]);      
          }
          }
        
       // console.log(chnom+chmontant);
        for (var i in chnom){
          ch+="nom:"+chnom[i]+",montant:"+chmontant[i]+"#";
         
        }
            Reponse.bulkCreate([
                {
                    reponse:req.body.r1,
                    configurationdevis_id:data[0].id,
                    devis_id:devis.id
    
                },{
                    reponse:req.body.r2,
                    configurationdevis_id:data[1].id,
                    devis_id:devis.id
                },
                {
                    reponse:req.body.r3+ch,
                    configurationdevis_id:data[2].id,
                    devis_id:devis.id
                }
            ]).then((reponse)=>{
              ch="";
            chmontant=[];
            chnom=[];
                    res.send(reponse);
            }).catch(err=>{
                res.status(500).send({ message: err.message });

            });
        }).catch(err =>{
            res.status(500).send({ message: err.message });


        })
          

        })
       
          .catch(err => {
            res.status(500).send({ message: err.message });
          });



    }).catch(err=>{
        res.status(500).send({ message: err.message });

    })    
  


  };
exports.findAllDevis = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
   
       Devis.findAll({ raw: true,
         order: [['created_at', 'DESC']]
       }).then(devis=>{
        res.send(devis)
       }).catch(err=>{
        res.status(500).send({
          message: err.message
        });
       })      
};

exports.findAllVoiture = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Voiture.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(voiture=>{
      res.send(voiture)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
     })      
};

exports.findAllDevisGarantie = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     DevisGarantie.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(devisgarantie=>{
      res.send(devisgarantie)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
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
  exports.deleteDevis=(req,res) => {
   
    Voiture.destroy({ where: { id: req.params.id } 
    }).then((devis)=>{
      res.send({ message: "Devis was deleted successfully!" });
      
   
    })
    .catch(err =>{
    res.status(500).send({ message: err.message });
  })
};

  
 