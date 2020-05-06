const db = require("../models");
const Quittance=db.quittance;
const Facture=db.facture;
const LF=db.ligneFacture;
var tq=new Array();
var cotisationQuittance1=new Array();
var descriptionQuittance1=new Array();
var taxeQuittance1=new Array();
var cotisationTTCQuittance1=new Array();
var LignesFacture1=new Array();
var LignesFacture=new Array();

exports.findAllQuittance = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Quittance.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(quittances=>{
      res.send(quittances)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
     })      
};

exports.findAllFacture = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     Facture.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(factures=>{
      res.send(factures)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
     })      
};

exports.findAllLigneFacture = (req, res,next) => {
  // const title = req.query.title;
   //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
 
     LF.findAll({ raw: true,
       order: [['created_at', 'DESC']]
     }).then(ligneFactures=>{
      res.send(ligneFactures)
     }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
     })      
};
exports.createQuittance = (req, res) => {
    var q=req.body;
                 quittance={
                 numero:q.numero,
                 dateQuittance:q.dateQuittance,
                 periodeDu:q.periodeDu,
                 type:q.typeQuittance,
                 dateEcheance:q.dateEcheance,
                 perdiodeAu:q.periodeAu,
                 totalHt:q.totalHt,
                 totalTaxe:q.totalTaxe,
                 total:q.total,
                 contratId:q.contratId
                 }
                tq.push(quittance);
 
                
                Quittance.bulkCreate(tq).then((quittance)=>{
                 //  res.send(garantie);
                 console.log("success");
                
                // console.log(quittance);
                 tq=[];
 
 
                 for (var key in q) 
                 {
                 if(key.indexOf('cotisationHT1')> -1)
                 {
                     cotisationQuittance1.push(q[key]);      
                   }
                  
                   if(key.indexOf('description1')> -1)
                 {
                   descriptionQuittance1.push(q[key]);      
                   }
                   
                   if(key.indexOf('taxe1')> -1)
                 {
                   taxeQuittance1.push(q[key]);      
                   }
                   
                   if(key.indexOf('cotisationTTC1')> -1)
                 {
                   cotisationTTCQuittance1.push(q[key]);      
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
                     res.send(facture);
                 })
               }).catch(err=>{
                   res.status(500).send({ message: err.message });
               
               });
             
 
 
               }).catch(err=>{
                   res.status(500).send({ message: err.message });
                   console.log(err.message);
               
               });
 
 }