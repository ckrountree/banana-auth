const request = require('./request');
const assert = require('chai').assert;
const mongoose = require('mongoose');

describe.only( 'Auth API',() => {

    beforeEach(() => mongoose.connection.dropDatabase());

    let token = null;
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'testUser',
                password: 'hello'
            })
            .then(({ body }) => token = body.token);
    });

    it('signup', () => {
        assert.ok(token);
    });


});