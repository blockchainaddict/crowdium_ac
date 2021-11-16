module.exports = (sequelize, dataTypes) => {
    let alias = "Video";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(255),
        },
        url: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        id_course: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
        
    };
    let config = {
        tableName: "videos",
        timestamps: false
    }

    const Video = sequelize.define(alias, cols, config);

    // Relational aspects

    Video.associate = function(models){
        Video.belongsTo(models.Course, {
            as: "course",
            foreignKey: "id_course"
        });
    }

    return Video;
}