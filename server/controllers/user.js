import db from "../models/index.js";

const User = db.user;

export const getUser = (req, res) => {
    const username = req.params.username;

    User.findOne({
        username: username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        if (req.userId !== user._id) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
        });
    });
};
