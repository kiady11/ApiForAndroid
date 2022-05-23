const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Cours = require("../database/models/Cours");
const pusher = require("../database/pusher")
const User = require("../database/models/Users");
const { default: mongoose } = require("mongoose");

router.get('/cours', bodyParser, async (req, res) => {
    try {
        console.log("transaction")
        Cours.find({}).exec((err, transaction) => {
            if (err) console.log(err)

            console.log(transaction)
            res.status(200).json({transaction: transaction})
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

router.post('/search/cours', bodyParser, async (req, res) => {
    const { reg } = req.body
    console.log(reg)
    try {
        const regex = new RegExp(reg, 'i');
        Cours.find({ $or: [{ nom: { $regex: reg, $options: 'i' } }, { details: { $regex: reg, $options: 'i' } }] }).exec((err, transaction) => {
            if (err) console.log(err)

            console.log(transaction)
            res.status(200).json({transaction: transaction})
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});


router.get('/cours/details/:nom', async (req, res) => {
    const { nom }  = req.params
    try {
        if (!nom) {
            res.status(400).send({ message: "Cours nom is missing" })
            return
        }
        Cours.findOne({ 'nom': new RegExp('^' + nom + '$', "i") })
        .populate('lessons')
        .exec(function (err, cours) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error on the server" })
            } else if (!cours) {
                res.status(400).json({ message: "No cours" })
            } else {
                console.log(cours)
                res.status(200).json({transaction: cours })
            }    
        })
       
    } catch (err) {
        res.status(500).json(err)
        return
    }
})

router.get("/test/pusher", async (req, res) => {
    console.log("test pusher")
    pusher.trigger("channel-1", "test_event", {message: "HELLO WORLD", title: "HELLO"})
    return
})

router.post('/cours',bodyParser,async(req, res)=>{
    const { nom, detail } = req.body
    try {
        if (!nom || !detail) res.status(400).json({ message: 'field missing' })
        Cours.findOne({ nom: new RegExp('^' + nom + '$', "i")}, (err, cours) => {
            if(err) {
                res.status(400).send({ message:"Error on the server " })
                return
            }
            if (cours) {
                res.status(400).send({message: "cours already exist in the database"})
                return
            } else {
                const cours_temp = new Cours({
                    nom: nom,
                    details: detail
                })
                cours_temp.save()
                pusher.trigger("channel-1", "test_event", {message: "Nouvel Cours disponible pour votre enfant", title: "Nouvel Cours"})
                return res.status(200).json({cours:cours_temp})
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return
    }
})

router.put('/user/cours',bodyParser,async(req, res)=>{
    const { user_id, cours_id } = req.body
    try {
        if (!user_id || !cours_id) {
            res.status(400).send({ message: "user ID or livre ID is missing" })
            return
        }
        User.update(
            { id: user_id },
            { $push: { cours: mongoose.mongo.ObjectId(cours_id) } }, (err, success) => {
                if (err) {
                    return res.status(400).send({ message:"Error on the server " })
                } else {
                    pusher.trigger("channel-1", "test_event", {message: "Vous avez ajouter un nouvel cours pour vos enfants", title: "Nouvel Cours"})
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