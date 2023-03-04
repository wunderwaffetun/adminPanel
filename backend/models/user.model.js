
export function defineUser (sequelize, Sequelize){
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        patronymic: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        position: {
            type: Sequelize.STRING
        },
        refreshToken: {
            type: Sequelize.STRING,
            allowNull: true
        }}, {
            timestamps: false
        }
        )
    return User; 
}