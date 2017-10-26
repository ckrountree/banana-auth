const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe( 'user model validation', () => {
    const user = new User({
        email: 'me@me.com'
    });
    const password = 'hello';

    it.only('generates hash from user password', () => {
        user.generateHash(password);
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    // it('compares user password', () => {
    //     assert.isOk(user.comparePassword('hello'));
    //     assert.isNotOk(user.comparePassword, ('bad password'));
    // });
});