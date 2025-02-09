const request = require('supertest');
import { expect } from 'vitest';
import { afterAll } from 'vitest';
const app = require('../server');
const db = require('../src/config/database');



describe('MAIN ROUTER', () => {

    afterAll(async () => {
        await db.close();
    });

    describe('TRY LOGIN', () => {
        it('should return 404', async () => {
            const res = await request(app).post('/loginnn').send({
                email: 'test@test.com',
                password: 'admin'
            });
            expect(res.status).toBe(404);
        });

        it('should return 401', async () => {
            const res = await request(app).post('/login').send({
                email: 'test@test.com',
                password: 'adminn'
            });
            expect(res.status).toBe(401);
        });

        it('should return 200', async () => {
            const res = await request(app).post('/login').send({
                email: 'test@test.com',
                password: 'admin'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('access_token');
        });
    });

    describe('TRY GET ALL USERS', () => {
        it('should return 401', async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(401);
        });

        it('should return 200', async () => {
            const loginRes = await request(app).post('/login').send({
                email: 'test@test.com',
                password: 'admin'
            });
            const token = loginRes.body.access_token;
            const res = await request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });
    });
                
});









// /////////////////////////////////A EFFACER////////////////////////////////////////
// import { expect, test } from 'vitest'

// test('adds 1 + 2 to equal 3', () => {
//   expect(1 + 2).toBe(3)
// })