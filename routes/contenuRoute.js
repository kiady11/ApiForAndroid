const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Contenu = require("../database/models/Contenus");

router.get('/contenus', bodyParser, async (req, res) => {
    try {
        Contenu.find({}).exec((err, transaction) => {
            if (err) console.log(err)
            res.status(200).json(transaction)
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

module.exports = router;