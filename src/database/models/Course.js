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

        // Course.belongsToMany(models.User, {
        //     as: "users",
        //     through: "user_course",
        //     foreignKey: "course_id",
        //     otherKey: "user_id",
        //     timestamps: false
        // });
    }


    return Course;
}