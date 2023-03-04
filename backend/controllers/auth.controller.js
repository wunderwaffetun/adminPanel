import { db } from "../models/index.js";
import jwt from 'jsonwebtoken'
import bcrypt  from "bcrypt"
import { tokenInstance } from "../service/token-service.js";


const User = db.user, 
    Role = db.role
const Op = db.Sequelize.Op // Эта штучка даёт доступ к AND, OR ... и многому другому 


const signIn = ( req, res ) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
    .then( user => {
        if(!user) { 
            
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null, 
                message: "Invalid Password!"
            })
        } 
        const { accessToken, refreshToken } = tokenInstance.generateTokens( user.id )
        tokenInstance.saveTokenIntoDb( user.id, refreshToken )
        
        let authorities = []; 
        user.getRoles()
        .then( roles => {
            roles.forEach( role => {
                authorities.push(role.position)
            });
            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).send({ // regData
                id: user.id,
                login: user.login,
                roles: authorities,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    })
}

export const controller = {
    signIn
}