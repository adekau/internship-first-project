'use strict';
module.exports = (sequelize, DataTypes, bcrypt) => {
  var User = sequelize.define('User', {
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
    tableName: 'users',
    hooks: {
      beforeCreate: function(user) {
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
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};