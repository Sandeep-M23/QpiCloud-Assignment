import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models/index.js";

const User = db.user;

export const signup = (req, res) => {
    console.log(req)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
    });

    console.log(user);


    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        console.log(user)

        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({
                message: "User was registered successfully!",
                user:user
            });
        });
    });
};

export const signin = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token,
        });
    });
};
