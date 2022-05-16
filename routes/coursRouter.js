const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Cours = require("../database/models/Cours");

router.get('/cours', bodyParser, async (req, res) => {
    try {
        Cours.find({}).exec((err, transaction) => {
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