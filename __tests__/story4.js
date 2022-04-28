const request = require('supertest');
const express = require('express');
const router = require('../backend/routes/auth-routes.js');

const app = new express();
app.use('/', router);

describe('Signup', function () {

  test('long username', async () => {
    const res = await request(app).post('/signup').send({
        body: {
            username: '123456789012345678901234567890123',
            email: 'correct@gmail.com',
            password: '12345678',
            name: 'John'
        } 
    });
    expect(res.statusCode).toBe(404);
    expect(res.isValid).toEqual(false);
  });
  
  test('long email', async () => {
    const res = await request(app).post('/signup').send({
        username: '12345678',
        email: 'incorrect1234567890123@gmail.com',
        password: '12345678',
        name: 'John' 
    });
    expect(res.statusCode).toBe(404);
    expect(res.isValid).toEqual(false);
  });

  test('long password', async () => {
    const res = await request(app).post('/signup').send({
        username: '12345678',
        email: 'correct@gmail.com',
        password: '123456789012345678901234567890123',
        name: 'John' 
    });
    expect(res.statusCode).toBe(404);
    expect(res.isValid).toEqual(false);
  });

  test('long name', async () => {
    const res = await request(app).post('/signup').send({
        username: '12345678',
        email: 'correct@gmail.com',
        password: '12345678',
        name: 'John12345678901234567890123456789' 
    });
    expect(res.statusCode).toBe(404);
    expect(res.isValid).toEqual(false);
  });

});