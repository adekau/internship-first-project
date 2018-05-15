"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const incidentRoutes = require("./routes/incidentRoutes");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const app = express();
app.get('/', (req, res) => {
    res.send('Backend API for First Project');
});
app.get('/incidents', incidentRoutes.index);
const sequelize = new Sequelize('incidents', 'Alex', '', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
sequelize.authenticate().then(() => {
    console.log('Connection to DB successful');
}).catch(err => {
    console.error('Unable to connect to DB:', err);
});
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Not a valid email address'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM('user', 'tracker'),
        allowNull: false
    }
});
User.addHook('beforeCreate', 'generateHash', user => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
        user.password = hash;
    })
        .catch(err => {
        if (err) {
            console.error('Error generating hash:', err);
        }
    });
});
User.sync({ force: true })
    .then(() => {
    User.create({
        firstName: 'Alex',
        lastName: 'Dekau',
        email: 'alexander.j.dekau@wmich.edu',
        role: 'user',
        password: 'test12'
    })
        .error(err => {
        if (err) {
            console.error(err);
        }
    });
});
app.listen(3000, () => console.log('app is listening on port 3000'));
