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

    it('cannot signup with same email', () => {
        return request
            .post('/api/auth/signup')
            .send({ email: 'testUser', password: 'goodbye' })
            .then(
                () => { throw new Error('Unexpected successful response');},
                err => {
                    assert.equal(err.status, 400);
                }
            );
    });
    it( 'must include a password', () => {
        return request
            .post('/api/auth/signup')
            .send({ email: 'otheruser', password: '' })
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 400);
                }
            );
    });

    // it.only('signin with same credentials', () => {
    //     return request
    //         .post('/api/auth/signin')
    //         .send({ email: 'user', password: 'hello' })
    //         .then(({ body }) => {
    //             assert.isOk(body.token);
    //         });
    // });

});