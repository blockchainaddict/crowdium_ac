module.exports = (sequelize, dataTypes) => {
    let alias = "User_Course";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        id_course: {
            type: dataTypes.INTEGER
        }
        
    };

    let config = {
        tableName: "user_course",
        timestamps: false
    }

    const User_Course = sequelize.define(alias, cols, config);

    // Relational aspects
    // User_Course.associate = function(models){
    //     User_Course.


    return User_Course;
}