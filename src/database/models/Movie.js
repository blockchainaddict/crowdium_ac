module.exports = (sequelize, dataTypes) => {
    let alias = "Projects";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_of_project: {
            type: dataTypes.STRING
        },
        date: {
            type: dataTypes.DATE
        },
        delivery_date: {
            type: dataTypes.DATE
        },
        house_m2: {
            type: dataTypes.INTEGER
        },
        house_floors: {
            type: dataTypes.INTEGER
        },
        house_rooms: {
            type: dataTypes.INTEGER
        },
        house_rooms: {
            type: dataTypes.INTEGER
        },
        house_bedrooms: {
            type: dataTypes.INTEGER
        },
        house_bathrooms: {
            type: dataTypes.INTEGER
        },
        comments: {
            type: dataTypes.STRING
        }
        
    };
    let config = {
        tableName: "projects",
        timestamps: false
    }

    const Project = sequelize.define(alias, cols, config);

    return Project;
}
