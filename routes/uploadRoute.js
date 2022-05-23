const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const multer = require("multer");
const Livres = require("../database/models/Livres");

const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./uploads")
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname)
            
            }
})
    
const uploadStorage = multer({ storage: storage })

router.post('/upload/book', uploadStorage.single("file"), (req, res) => {
    try {
         const livre_temp = new Livres({
            titre: req.titre,
            filename: req.file.path
        })
        livre_temp.save()
        return res.send("Single file")
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

module.exports = router;