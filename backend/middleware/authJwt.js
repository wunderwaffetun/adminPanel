import Jwt from "jsonwebtoken";
import { db } from "../models/index.js";
import { tokenInstance } from "../service/token-service.js";

const User = db.user; 

const updateTokens = ( req, res ) => {
    console.log('update-tokens')

    let refresh = req.cookies?.refreshToken

    if( refresh ){
        Jwt.verify(refresh, process.env.JWT_REFRESH_SECRET_KEY, ( err, decode ) => {
            if ( err ) {
                // return res.status(401).send({
                //     message: "Unauthorized!"
                // });
            } 
            if (decode) {
                console.log(decode)
                    db.user.findByPk(decode.id)
                        .then( user => {
                            console.log(refresh)
                            console.log('21' + user)
                            return tokenInstance.refreshDbTokens( user )
                        })
                        .then( tokens => {
                            console.log('hobba')
                            res.cookie('refreshToken', tokens.refreshToken, { 
                                maxAge: 30 * 24 * 60 * 60 * 1000,
                                httpOnly: true
                            })
                            res.status(200).json({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
                        })
                        .catch(err => console.log('35' + err))
                }
            })
    } else {


        return res.status(403).send({
            message: "Unauthorized!"
        });
    }
}

const verifyToken = (req, res, next) => {
    let access = req.headers.authorization.split(' ')[1]
    let refresh = req.cookies?.refreshToken
    


    if( !access || !refresh ) { 
        console.log('guest')
        req.guest = true
        next()
        return
    }

    Jwt.verify(access, process.env.JWT_ACCESS_SECRET_KEY, (err, decoded) => {
        if( err ) { // if access token not valid
            return res.status(401).send({
                message: "Auto update tokens waiting"
            });
        }; 
        if(decoded){ // Если access token is valid 
            console.log('verify passed')
            req.userId = decoded.id;
            next();
        }
        
    });
};

const resetToken = async (req, res, next) => {
    console.log('reset')
    let refresh = req.cookies.refreshToken
    if( refresh ){
        const answer = await tokenInstance.deleteToken(refresh)
        res.clearCookie('refreshToken')
        if (answer) {
            res.status(200).json({message: 'clear success'})
        } else {
            res.status(200).json({message: 'No such token'})
        }
    } else {// if get request to deauth but user not login (such mustn't be )
        
        console.log('authJwt: resetToken(), не нужно деавторизовываться т.к. не зареганы')
        res.status(401).json({message: 'Unauthorized'})
    }
}

const highOrderRoles = ( needRoles ) =>  {
    return function(req, res, next){
        console.log('isCodir')
        if(req.guest){
            res.status(403).json({message: 'Ha-ha not hacked'})
        } else {
            db.user.findByPk(req.userId)
                .then(user => user.getRoles())
                .then(roles => {
                    console.log()
                    if (~needRoles.indexOf(roles[0].position)){
                        console.log('passed')
                        next()
                    } else {
                        console.log('no - passed')
                        res.status(403).json({message: 'Dir role required'})
                    }
                })
                .catch(err => console.log('107' + err))
        }
    }
}

const isDirOrCodir = highOrderRoles(['dir', 'codir'])
const isDir = highOrderRoles(['dir'])







export const authJwt = {
    verifyToken,
    updateTokens,
    resetToken, 
    isDir,
    isDirOrCodir
}