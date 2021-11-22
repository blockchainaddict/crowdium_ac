const User_Course = require("./User_Course");

module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(255)
        },
        last_name: {
            type: dataTypes.STRING(255)
        },
        password: {
            type: dataTypes.STRING(255)
        }
        
    };

    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    // Relational aspects
    User.associate = function(models){
        User.belongsToMany(models.Course, {
            as: 'courses',
            through: "user_course",
            foreignKey: "id_course",
            otherKey: "id_course",
            timestamps: false
        })
    }


    return User;
}