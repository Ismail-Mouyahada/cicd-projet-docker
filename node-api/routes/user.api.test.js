const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./user.api.js');
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { keyPub, key } = require('../env/keys');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRouter);

describe('POST /user', () => {
  it('should create a new user', async () => {
    const user = {
      name: 'John',
      email: 'john@gmail.com',
      password: 'password',
    };
    const res = await request(app).post('/user').send(user);
    expect(res.status).toBe(200);

    const createdUser = await UserModel.findOne({ email: 'john@gmail.com' });
    expect(createdUser.name).toBe('John');
    expect(await bcrypt.compare('password', createdUser.password)).toBe(true);
  });
});

describe('GET /user/current', () => {
  it('should return null if no token is provided', async () => {
    const res = await request(app).get('/user/current');
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it('should return null if the token is invalid', async () => {
    const res = await request(app)
      .get('/user/current')
      .set('Cookie', [`token=invalidtoken`]);
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it('should return null if the token is valid but the user does not exist', async () => {
    const token = jsonwebtoken.sign({ sub: 'nonexistentuserid' }, keyPub);
    const res = await request(app)
      .get('/user/current')
      .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(200);
    expect(res.body).toBeNull();
  });

  it('should return user details if the token is valid and the user exists', async () => {
    const user = new UserModel({
      name: 'John',
      email: 'john@gmail.com',
      password: 'hashedpassword',
    });
    await user.save();

    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 60 * 60 * 24 * 30 * 6,
      algorithm: 'RS256',
    });

    const res = await request(app)
      .get('/user/current')
      .set('Cookie', [`token=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: user._id.toString(),
      name: 'John',
      email: 'john@gmail.com',
    });
  });
});
