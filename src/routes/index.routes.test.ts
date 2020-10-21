var request = require('supertest');
import {App} from '../app';

describe('BookRoute', function() {
    
    test('routes', async () => {
        request(App)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '4')
        .expect(200, "ok")
    })
});