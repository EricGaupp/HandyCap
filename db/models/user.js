module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return user;
}
