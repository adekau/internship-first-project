module.exports = (sequelize, DataTypes, bcrypt) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Non-valid email address'
                }
            }
        },
        password: DataTypes.STRING,
        role: DataTypes.ENUM('user', 'tracker')
    }, {
            freezeTableName: true,
            individualHooks: true,
            tableName: 'users',
        });

    User.addHook('beforeCreate', 'generateHash', (user) => {
        var hash = bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                if (err) {
                    console.error('Error generating password hash:', err);
                }
            });
    });

    User.addHook('beforeBulkCreate', 'generateBulkHash', (users) => {
        for (let user of users) {
            var hash = bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash;
                })
                .catch(err => {
                    if (err) {
                        console.error('Error generating password hash:', err);
                    }
                });
        }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Incident, {
            foreignKey: 'userId',
            as: 'incidents'
        });
    }

    return User;
};