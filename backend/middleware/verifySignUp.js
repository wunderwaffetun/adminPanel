import { db } from "../models/index.js";

const ROLES = db.ROLES; 
const User = db.user

const checkDuplicateLogin = (req, res, next) => {
    User.findOne({
        where: {
            login: req.body.data.login
        }
    })
    .then( user => {
        if ( user ) {
            res.status(400).send({ message: "Failed! Username is already exists"})
        } else {
            next()
        }
    })
    
}

const checkRoleExists = (req, res, next) => {
    const role = req.body.data.position
    if ( role ) {
        if (!ROLES.includes( role )) {
            res.status(400).send({message: "Failed! Role does not exist " + role})
            return;
        } else {
            next()
        }
    }
}

const verifySignUp = {
    checkDuplicateLogin,
    checkRoleExists
};

export { verifySignUp }
