const db = require("../models");
const File= db.file;

  
const testFolder = 'D:/PFE/front/assurance/src/assets/app-assets/images/Dropbox/Assurance';
const Folder = 'D:/PFE/front/assurance/src/assets/app-assets/uploads';

const fs = require('fs');
var filelist = new Array();
var fileTraite= new Array();


exports.listeFile = (req, res) => {
    // Save user to database
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
           // console.log(file);
         filelist.push(file);
        });
        res.send(filelist);
        filelist=[];
      })
  };

  exports.deleteFile = (req, res) => {
    // Save user to database
    filePath=req.params.filePath
    path="D:/PFE/front/assurance/src/assets/app-assets/images/Dropbox/Assurance/"
    fs.unlink(path+filePath,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });  

  };


  exports.createFile = (req, res) => {
    // Save user to database
    file=req.body.file
    fs.rename('D:/PFE/front/assurance/src/assets/app-assets/images/Dropbox/Assurance/'+file,
     'D:/PFE/front/assurance/src/assets/app-assets/uploads/'+file, function (err) {
      if (err) return console.error(err)
      File.create({
        nom: req.body.nom,
        type: req.body.type,
        date: req.body.date,
        image: file,
        clientId: req.body.clt
     
      })
      .then(() => {
          res.send({ message: "File was registered successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
     })

  };
 


  exports.listeFileTraite = (req, res) => {
    // Save user to database
    File.findAll({ raw: true,
      order: [['created_at', 'DESC']]
    }).then(file=>{
     res.send(file);
  

    })     
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    File.update({
        nom: req.body.nom,
        type: req.body.type,
        date: req.body.date,
        clientId: req.body.clt
    }, {
      where: { id: id }
    })
      .then(() => {
          res.send({
            message: "File was updated successfully."
          });
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  };


  exports.delete= (req, res) => {
    const id = req.params.id;
    File.findByPk(id).then(data => {
      fs.unlink(Folder+'/'+data.image,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
          });  
    })
    .catch(err => {
      res.status(500).send({
        message: err
      });
    });

    
    File.destroy({
       where: { id: id }
     })
       .then(() => {
        
           res.send({
             message: "File was deleted successfully!"
           });
        
       })
       .catch(err => {
         res.status(500).send({
           message: err
         });
       });
};