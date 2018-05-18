'use strict';

const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let pass = bcrypt.hashSync('test12', 10);

        return queryInterface.bulkInsert('users', [{
            firstName: 'Alex',
            lastName: 'Dekau',
            email: 'alexander.j.dekau@wmich.edu',
            role: 'user',
            password: pass
        },
        {
            firstName: 'Tyler',
            lastName: 'Vander Maas',
            email: 'tyler@meetmaestro.com',
            role: 'tracker',
            password: pass
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
