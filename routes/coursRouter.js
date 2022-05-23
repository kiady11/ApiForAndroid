const express = require('express');
var bodyParser = require('body-parser').json();
const router = express.Router();
const Cours = require("../database/models/Cours");
const Pusher = require("pusher")
const pusher = new Pusher({
    appId: "1413109",
    key: "6028606e361eb648ceb3",
    secret: "cb3ef03605e9ca0580b6",
    cluster: "eu", // if `host` is present, it will override the `cluster` option.
    encryptionMasterKeyBase64: "p7NQ+YtcaU/po3djbqg+CajghWhLxIYGCAfUexQ3vQ4=", // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
})
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

router.get("/test/pusher", async (req, res) => {
    console.log("test pusher")
    pusher.trigger("channel-1", "test_event", {message: "HELLO WORLD"})
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
                    nom: firstname,
                    details: lastname
                })
                cours_temp.save()
                return res.status(200).json({cours:cours_temp})
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
        return
    }
})


module.exports = router;