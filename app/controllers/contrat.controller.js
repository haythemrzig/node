const db = require("../models");
const Contrat= db.contrat;
const Voiture=db.voiture;
const Quittance=db.quittance;
const ContratGarantie=db.contratGarantie;
const Facture=db.facture;
const LF=db.ligneFacture;

var t=new Array(); 
var tq=new Array();
var cotisationQuittance1=new Array();
var descriptionQuittance1=new Array();
var taxeQuittance1=new Array();
var cotisationTTCQuittance1=new Array();
var LignesFacture1=new Array();

var cotisationQuittance2=new Array();
var descriptionQuittance2=new Array();
var taxeQuittance2=new Array();
var cotisationTTCQuittance2=new Array();
var LignesFacture2=new Array();

var LignesFacture=new Array();
var Lignes2=new Array();


exports.createContrat = (req, res) => {
  
   var c=req.body.contrat;
   var q=req.body.quittance;


    Voiture.create({
        anneeFab:c.anneeFab,
        modele: c.modele,
        immatriculation:c.immatriculation,
        dateAcquisition: c.dateAcquisition,
        marque: c.marque,
        trims:c.trims,
        carburant: c.carburant,
        dateMiseEnCirculation:c.dateMiseEnCirculation,
    }).then((voiture)=>{


        Contrat.create({
      
            numeroPolice:c.numeroPolice,
            numeroPoliceExterne: c.numeroPoliceExterne,
            dateEffet: c.dateEffet,
            dateFin: c.dateFin,
            echeancePrincipale:c.echeancePrincipale,
            modeFractionnement: c.modeFractionnement,
            reconductible: c.reconductible,
            dateSignature: c.dateSignature,
            montant:c.montant,
            risqueId:c.risque,
            familleproduitId:c.famille,
            clientId:c.client,
            voitureId:voiture.id,
            compagnieId:c.compagnie,
            apporteurId:c.apporteur
        })
        .then((contrat) => {
             for (var key in c) 
        {
        if(key.indexOf('idG')> -1)
        {
            garantie={
                garantie_id:c[key],
                contrat_id:contrat.id
                    }
             t.push(garantie);
        }
         }
         
        console.log(t);
         ContratGarantie.bulkCreate(t).then((garantie)=>{
            //  res.send(garantie);
            //console.log("success");
            t=[];
          }).catch(err=>{
              res.status(500).send({ message: err.message });
              console.log(err.message);
          
          });

                quittance={
                numero:q.numero,
                dateQuittance:q.dateQuittance,
                periodeDu:q.periodeDu,
                type:q.typeQuittance,
                dateEcheance:q.dateEcheance,
                perdiodeAu:q.periodeAu,
                totalHt:q.totalHt1,
                totalTaxe:q.totalTaxe1,
                total:q.total1,
                contratId:contrat.id
                }
               tq.push(quittance);

               if(q.numero1){
                quittance1={
                    numero:q.numero1,
                    dateQuittance:q.dateQuittance1,
                    periodeDu:q.periodeDu1,
                    type:q.typeQuittance1,
                    dateEcheance:q.dateEcheance1,
                    perdiodeAu:q.periodeAu1,
                    totalHt:q.totalHt2,
                    totalTaxe:q.totalTaxe2,
                    total:q.total2,
                    contratId:contrat.id
                       }
                       tq.push(quittance1);
                      

               }
               Quittance.bulkCreate(tq).then((quittance)=>{
                //  res.send(garantie);
                console.log("success");
                console.log(tq);
                
               // console.log(quittance);
                tq=[];


                for (var key in q) 
                {
                if(key.indexOf('cotisationHT1')> -1)
                {
                    cotisationQuittance1.push(q[key]);      
                  }
                  if(key.indexOf('cotisationHT2')> -1)
                {
                    cotisationQuittance2.push(q[key]);      
                  }
                  if(key.indexOf('description1')> -1)
                {
                  descriptionQuittance1.push(q[key]);      
                  }
                  if(key.indexOf('description2')> -1)
                {
                  descriptionQuittance2.push(q[key]);      
                  }
                  if(key.indexOf('taxe1')> -1)
                {
                  taxeQuittance1.push(q[key]);      
                  }
                  if(key.indexOf('taxe2')> -1)
                  {
                    taxeQuittance2.push(q[key]);      
                    }
                  if(key.indexOf('cotisationTTC1')> -1)
                {
                  cotisationTTCQuittance1.push(q[key]);      
                  }
                  if(key.indexOf('cotisationTTC2')> -1)
                  {
                    cotisationTTCQuittance2.push(q[key]);      
                    }
                }
                for(i in cotisationQuittance1){
                    facture={
                        description:descriptionQuittance1[i],
                        cotisationHT:cotisationQuittance1[i],
                        taxe:taxeQuittance1[i],
                        cotisationTTC:cotisationTTCQuittance1[i]
                    }
                    LignesFacture1.push(facture);
                }
              
                


              Facture.bulkCreate(LignesFacture1).then((facture)=>{
                //  res.send(garantie);
                descriptionQuittance1=[];
                cotisationQuittance1=[];
                taxeQuittance1=[];
                cotisationTTCQuittance1=[];
                LignesFacture1=[];
                for(i in facture)
                {
                    lf={
                        facture_id:facture[i].id,
                        quittance_id:quittance[0].id
                    }
                    LignesFacture.push(lf)
                }
                LF.bulkCreate(LignesFacture).then((facture)=>{
                    LignesFacture=[];
                })
              }).catch(err=>{
                  res.status(500).send({ message: err.message });
              
              });
if(cotisationQuittance2){
    for(i in cotisationQuittance2){
        facture={
            description:descriptionQuittance2[i],
            cotisationHT:cotisationQuittance2[i],
            taxe:taxeQuittance2[i],
            cotisationTTC:cotisationTTCQuittance2[i]
        }
        LignesFacture2.push(facture);
    }
    Facture.bulkCreate(LignesFacture2).then((facture2)=>{
        //  res.send(garantie);
        descriptionQuittance2=[];
        cotisationQuittance2=[];
        taxeQuittance2=[];
        cotisationTTCQuittance2=[];
        LignesFacture2=[];
        for(i in facture2)
        {
            lf1={
                facture_id:facture2[i].id,
                quittance_id:quittance[1].id
            }
            Lignes2.push(lf1)
        }
        LF.bulkCreate(Lignes2).then((fact)=>{
            Lignes2=[];
        })
      }).catch(err=>{
          res.status(500).send({ message: err.message });
      
      });
}
            
              res.send(contrat);


              }).catch(err=>{
                  res.status(500).send({ message: err.message });
                  console.log(err.message);
              
              });



    }).catch(err=>{
        res.status(500).send({ message: err.message });

    }) 
})   
  

}

exports.findAllContrat = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Contrat.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(contrats=>{
      res.send(contrats)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
     })      
};

exports.findAllContratGarantie = (req, res,next) => {
// const title = req.query.title;
 //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

   ContratGarantie.findAll({ raw: true,
     order: [['created_at', 'DESC']]
   }).then(contratgarantie=>{
    res.send(contratgarantie)
   }).catch(err=>{
    res.status(500).send({
      message: err.message
    });
   })      
};
/*
exports.updateAvenant = (req, res) => {
  
  Contrat.update({
    dateEffet: req.body.dateEffet,
    dateFin: req.body.dateFin,
    montant:req.body.montant   
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
*/
exports.updateContrat = (req, res) => {
  
  Voiture.update({
    anneeFab:req.body.anneeFab,
    modele: req.body.modele,
    immatriculation:req.body.immatriculation,
    dateAcquisition: req.body.dateAcquisition,
    marque: req.body.marque,
    trims:req.body.trims,
    carburant: req.body.carburant,
    dateMiseEnCirculation:req.body.dateMiseEnCirculation,
    },
  {
    where: { id: req.params.id }
  }).then(()=>{

    Contrat.update({
      numeroPolice:req.body.numeroPolice,
      numeroPoliceExterne: req.body.numeroPoliceExterne,
      dateEffet: req.body.dateEffet,
      dateFin: req.body.dateFin,
      echeancePrincipale:req.body.echeancePrincipale,
      dateSignature: req.body.dateSignature,
      montant:req.body.montant,
      compagnieId:req.body.compagnie,
      apporteurId:req.body.apporteur
    },
    {
      where: { voitureId: req.params.id }

    }).then(()=>{
      res.send({ message: "Contrat succeess was updated successfully!" });
    }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
    })
  })
   .catch(err=>{
        res.status(500).send({
          message: err.message
        });
      })
  
 
};

exports.getOneVoiture = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
   const id = req.params.id;

   Voiture.findByPk(id)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message: err
       });
     });   
  };

exports.getOnecontrat = (req, res,next) => {
    // const title = req.query.title;
     //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
    
     const id = req.params.id;
  
     Contrat.findOne({
      where: {
        voitureId: id
      }
    }).then(data => {
         res.send(data);
       })
       .catch(err => {
         res.status(500).send({
           message: err
         });
       });   
    };