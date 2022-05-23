
const express = require("express")
var bodyParser = require('body-parser').json()
const User = require('../database/models/Users')
const router = express.Router()

const pusher = require("../database/pusher")

//register user 
router.post("/register", bodyParser, async (req, res) => {
    const { firstname, lastname, email, password} = req.body
    try {
       
        if (!firstname &&!lastname && email && password) {
            res.status(400).send({ message: "All fields should not empty" })
            return
        }
        User.findOne({ email: new RegExp('^' + email + '$', "i")}, (err, user) => {
            if(err) {
                res.status(400).send({ message:"Error on the server " })
                return
            }
            if (user) {
                res.status(400).send({message: "User already exist in the database"})
                return
            } else {
                const user_temp = new User({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })
                pusher.trigger("channel-1", "test_event", {message: "Vous etes maintenant inscris sur l'application", title: "HELLO"})
                user_temp.save()
                return res.status(200).json({user:user_temp})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        return
    }
})

//login user
router.post('/login', bodyParser, async (req, res) => {
    const { email, password } = req.body
    console.log("TEST")
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Veuillez remplir tous les formulaires" })
            return
        }
        User.findOne({ email: new RegExp('^' + email + '$', "i") })
        .populate({ path: 'histoires', select: 'titre' })
        .exec(function (err, user) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: "Error on the server" })
            } else if (!user) {
                res.status(400).json({ message: "Email introuvable dans la base" })
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                    if (matchError) {
                        throw matchError
                    } else if (!isMatch) {
                        console.log("password", password)
                        res.status(400).json({ message: "Mot de passe incorrect" })
                    } else {
                       pusher.trigger("channel-1", "test_event", {message: "Logging successfuly", title: "HELLO"})
                        res.status(200).json({ message: "User connected", user: user })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        return
    }
})

//get all my histories
router.get('/user', async(req, res)=>{
    try{
        const user  = await User.findOne({id: 2})
        console.log(user)
        await user.populate("histoires").execPopulate()
        res.status(200).json({ user: user })
    }catch(err){
        return res.status(500).json(err)
    }
})  

module.exports = router;