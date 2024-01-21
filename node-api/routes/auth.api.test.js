const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');
const authRouter = require('./auth.api.js');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

describe('POST /', () => {
  it('should authenticate user and return token', async () => {
    const password = await bcrypt.hash('mypassword', 8);
    await UserModel.create({
      email: 'test@example.com',
      password,
    });

    const response = await request(app).post('/auth').send({
      email: 'test@example.com',
      password: 'mypassword',
    });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('test@example.com');
    expect(response.header['set-cookie']).toBeDefined();
  });

  it('should return 400 for invalid credentials', async () => {
    const response = await request(app).post('/auth').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(400);
  });
});

describe('DELETE /', () => {
  it('should clear token cookie', async () => {
    const response = await request(app).delete('/auth');

    expect(response.status).toBe(200);
    expect(response.header['set-cookie']).toBeDefined();
  });
});
