module.exports = function(sequelize, DataTypes) {
    var score = sequelize.define("score", {
        tees: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        gross: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        net: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return score;
}
