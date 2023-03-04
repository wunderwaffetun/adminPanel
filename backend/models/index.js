import fs from 'fs'
import { Sequelize } from 'sequelize'
import { defineUser } from './user.model.js'
import { defineRole } from './role.model.js'

// console.log(fs.readFileSync('../config/config.json'))

const config = JSON.parse(fs.readFileSync('./config/config.json'))['db']


const sequelize = new Sequelize(
    config.database, 
    config.user, 
    config.password,{
        logging: false,
        host: config.host,
        dialect: "postgres",
        operatorsAliases: false,
        pool: {
            max: 1, //количество подключений
            min: 0,
            acquire: 30000, // try connnect 
            idle: 10000 // after idle time we disconnect 
        }
    }
)


const db = {
    Sequelize, 
    sequelize, 
}

db.user = defineUser(sequelize, Sequelize)
db.role = defineRole(sequelize, Sequelize)

db.role.belongsToMany(db.user, { //Связываю таблицу ролей и пользователей
    through: 'user_roles',
    foreignKey: 'roleId', 
    otherKey: 'userId'
})

db.user.belongsToMany(db.role, {
    through: 'user_roles', 
    foreignKey: 'userId',
    otherKey: 'roleId'
})

db.ROLES = ['sec', 'codir', 'dir', 'user']

export { db }