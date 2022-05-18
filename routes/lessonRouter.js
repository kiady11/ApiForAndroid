const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Lessons = require("../database/models/Lessons");
const Cours = require("../database/models/Cours");

router.get('/lessons', bodyParser, async (req, res) => {
    try {
        Lessons.find({}).exec((err, transaction) => {
            if (err) console.log(err)
            res.status(200).json(transaction)
       })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return 
    }
});

router.get('/lessons/cours/:id', async (req, res) => {
    const  cours_id  = req.params.id
    try {
        if (!cours_id) {
            res.status(400).send({ message: "Cours ID is missing" })
            return
        }
        Cours.findOne({ 'id': cours_id }, (errror, cour) => {
            if (errror) {
                console.log(errror)
                res.status(400).send({ message:"Error on the server " })
                return
            }
            console.log(cour)
            Lessons.find({'cours':cour._id }).sort({_id: -1}).limit(3).exec((err, transaction) => {
                if (err) {
                    res.status(400).send({ message:"Error on the server " })
                    return
                }
                console.log(transaction)
                res.status(200).json({ lessons: transaction})
            })
        })
       
    } catch (err) {
        res.status(500).json(err)
        return
    }
})


module.exports = router;