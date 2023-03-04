
import { db } from "../models/index.js"
import bcrypt from 'bcrypt'
import { Op } from "sequelize"



class RequestController  {

    async viewBoard ( req, res ) {
        if(req.guest) { // если гость
            db.user.findAll({
                attributes: { exclude: ['password', 'refreshToken', 'phone', 'address']}
            })
            .then(users => {
                res.status(200).json({role: '', userList: users})
            })
            
        } else { // если работник, можно просматривать всё, также нужно отдать его роль
            try{
                const user = await db.user.findByPk(req.userId)
                console.log(user)
                const data = await user.getRoles()
                console.log(data)
                const role = await data[0].position

                db.user.findAll({
                    attributes: { exclude: ['password', 'refreshToken']}
                })
                .then(users => {
                    res.status(200).json({role: role, userList: users})
                })

            } catch(err){
                console.log(err)
            }
        }
    }

    async deleteUser (req, res, next) {
        const currentDel = req.params.login
        db.user.findByPk(currentDel)
            .then(user => {
                console.log(user)
                if(user?.login === 'dir'){
                    console.log('dir')
                    res.status(403).json({message: 'u cant remove dir'})
                } else {
                    db.user.destroy({
                        where: {
                            id: currentDel
                        }
                    }).then(res.status(200).json({message: `${currentDel} wasDeleted` }))
                    console.log('deleted')
                    
                }
            })
    }

    async changeUser (req, res, next) { 
        const obj = req.body.data
        db.user.update({
            name: obj.name, 
            surname: obj.surname,
            patronymic: obj.patronymic,
            position: obj.position,
            phone: obj.phone, 
            address: obj.address,
            password: bcrypt.hashSync(obj.password, 3),
            login: obj.login
        }, { where: { login: obj.login }})
        .then( user => {
            db.role.findOne({
                where: { position: obj.position }
            })
            .then(role => {
                console.log(role)
                return user.setRole(role)
            })
            .then(() => {
                res.status(200).json({message: 'success'})
            })
            .catch(err => console.log('80 ' + err))
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    async addUser ( req, res )  {
        const obj = req.body.data
        console.log(obj)
        db.user.create({
            name: obj.name, 
            surname: obj.surname,
            patronymic: obj.patronymic,
            position: obj.position,
            phone: obj.phone, 
            address: obj.address,
            password: bcrypt.hashSync(obj.password, 3),
            login: obj.login 
        })
        .then( user => {
            if (obj.position) { 
                console.log(obj.position)
                db.role.findOne({
                    where: {
                        position: obj.position
                    }
                })
                .then( roles => {
                    user.setRoles( roles ).then(() => {
                        res.status(200).send({message: "User was register succesfully"})
                    })
                })
                .catch(err => console.log('36 ' + err))
            } else {
                user.setRoles([1]).then(() => {
                    res.send({message: "User was register succesfully"})
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }

}

export const controller = new RequestController()


