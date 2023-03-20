const express = require("express");
const router = express.Router();
const users = require("../models/UserSchema");
const Data = require("../models/User")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MYnameis1$#";


//Create user

router.post("/creatuser",
    [body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await Data.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true });


        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })
// loginuser

router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await Data.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: "try logging with correct data" });

            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "try logging with correct data" });
            }

            const data = {
                user: {
                    id: userData.id

                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })
  
// register
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { id, name, age, city, salary } = req.body;

    if (!id || !name || !age || !city || !salary) {
        res.status(422).json("plz fill the  data");
    }
    try {
        const preuser = await users.findOne({ id: id });
        console.log(preuser);

        if (preuser) {
            res.status(422).json("this is user is already present");
        } else {
            const adduser = new users({
                id, name, age, city, salary

            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch (error) {
        res.status(422).json(error);
    }
})

//get userdata
router.get("/getdata", async (req, res) => {

    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await users.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

router.put("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
