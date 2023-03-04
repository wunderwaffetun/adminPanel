import { db } from "../models/index.js";
import jwt from "jsonwebtoken";


class TokenService {
    generateTokens(id){
        const accessToken = jwt.sign({id: id}, process.env.jwt_ACCESS_SECRET_KEY, {expiresIn: '100s'});
        const refreshToken = jwt.sign({id: id}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    } 
    async saveTokenIntoDb(id, refreshToken){
        db.user.update({refreshToken: refreshToken}, {
            where: {id: id} 
        }).then( answer => {console.log(answer)})
        .catch(e => {console.log('token service' + e)})
    }

    async refreshDbTokens( user ){ //обновляет рефреш токен в дб и возвращает пару токенов
        console.log(user.id)
        const tokens = this.generateTokens(user.id)
        db.user.findOne({ where: {refreshToken: user.refreshToken}})
            .then( user => {
                this.saveTokenIntoDb(user.id, tokens.refreshToken)
            })
        return tokens;
    }

    async deleteToken( refreshToken ) {
        console.log(refreshToken)
        return await db.user.findOne({ where: {refreshToken: refreshToken}})
            .then(user => { 
                if( user ){
                    console.log(user, '60')
                    return db.user.update( {refreshToken: null}, {
                        where: {refreshToken: refreshToken}
                    })
                } else return null
            })
            .catch(err => console.log('token-service: 59' + err))
    }
}

const tokenInstance = new TokenService()

export { tokenInstance }