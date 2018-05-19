module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false  
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        handicap: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    });
    return user;
}
