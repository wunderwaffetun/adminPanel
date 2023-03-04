export function defineRole(sequelize, Sequelize) {
    const Role = sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true
        }, 
        position: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { timestamps: false })
    return Role
}