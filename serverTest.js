//apiTest.js
const request = require('supertest');
const server = require('./server');

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /users', function () {
    it('respond with hello world', function (done) {
        request(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('Hello world!')
            .expect(200, done);
    });
});