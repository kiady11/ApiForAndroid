const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Livres = require("../database/models/Livres");
const User = require('../database/models/Users');
const { default: mongoose } = require("mongoose")

router.get('/livres', bodyParser, async (req, res) => {
    try {
        Livres.find({}).exec((err, transaction) => {
            if (err) console.log(err)
            res.status(200).json(transaction)
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

router.get('/livres/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        User.findOne({ _id: mongoose.mongo.ObjectId("6288e304d3525c88e2bc890d") })
        .exec(function (err, user) {
            if (err) {
                res.status(500).json({ message: "Error on the server" })
            } else if (!user) {
                res.status(400).json({ message: "Email introuvable dans la base" })
            } else {
                res.status(200).json({ user: user })
        
            }
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