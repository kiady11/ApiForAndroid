const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Livre = require("../database/models/Livre");
const User = require('../database/models/Users');
const { default: mongoose } = require("mongoose")

router.get('/livres', bodyParser, async (req, res) => {
    try {
        Livre.find({}).exec((err, transaction) => {
            if (err) console.log(err)
            res.status(200).json(transaction)
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

router.get('/livres/users/:id', bodyParser, async (req, res) => {
    try {
        User.find({id: id}).populate('histoires').select("histoires").exec((err, transaction) => {
            if (err) console.log(err)
            res.status(200).json(transaction)
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

router.post("/livres/users", bodyParser, async (req, res) => {
    const { user_id, livre_id } = req.body
    try {
        if (!user_id || !livre_id) {
            res.status(400).send({ message: "user ID or livre ID is missing" })
            return
        }
        User.update(
            { id: user_id },
            { $push: { histoires: mongoose.mongo.ObjectId(livre_id) } }, (err, success) => {
                if (err) {
                    return res.status(400).send({ message:"Error on the server " })
                } else {
                    return res.status(200).json({ message: "success transaction" })
                }
            }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
})


module.exports = router;