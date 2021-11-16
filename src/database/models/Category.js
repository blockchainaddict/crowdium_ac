module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(25),
        }
        
    };
    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    // Relational aspects
    Category.associate = function(models){
        Category.belongsTo(models.Category, {
            as: "category",
            foregignKey: "id_category"
        })
    }


    return Category;
}