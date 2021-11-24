// const User_Course = require("./User_Course");

module.exports = (sequelize, dataTypes) => {
    let alias = "Course";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
        },
        description: {
            type: dataTypes.TEXT,
        },
        id_category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        course_img: {
            type: dataTypes.STRING(255),
            allowNull: true
        }
        
    };

    let config = {
        tableName: "courses",
        timestamps: false
    }

    const Course = sequelize.define(alias, cols, config);

    // Relational aspects
    Course.associate = function(models){
        Course.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        });

        Course.belongsToMany(models.User, {
            as: "users",
            through: 'user_course',
            foreignKey: "id_course",
            otherKey: "id_user",
            timestamps: false
        });

        Course.hasMany(models.Video, {
            as: 'videos',
            foreignKey: 'id_course'
        })
    }


    return Course;
}