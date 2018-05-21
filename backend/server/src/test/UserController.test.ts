import { models } from '../models';
import * as controllers from '../modules';

export function setUp(callback) {
    models.sequelize.authenticate().then(err => {
        if (err) {
            callback(err);
        } else {
            models.sequelize.sync().then(_ => {
                callback();
            });
        }
    });
}

export function createUserTest(test) {
    let testUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@test.fake',
        password: '!!TEST!!PASSWORD@',
        role: 'user'
    };

    models.User.destroy({
        where: {
            email: testUser.email
        }
    })
        .then(_ => {
            models.User.create(testUser)
                .then(user => {
                    test.equal(user.firstName, testUser.firstName, "Test failed: firstName not equal");
                    test.equal(user.lastName, testUser.lastName, "Test failed: lastName not equal");
                    test.equal(user.password, testUser.password, "Test failed: password not equal");
                    test.equal(user.email, testUser.email, "Test failed: email not equal");
                    test.equal(user.role, testUser.role, "Test failed: role not equal");
                    test.done();
                });
        })
}