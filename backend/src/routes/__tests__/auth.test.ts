import request from 'supertest';
import app from '../../server';
import User from '../../models/User';

describe('Auth Routes', () => {
  const testUser = {
    username: 'testtest',
    email: 'test@test.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.user).toHaveProperty('username', testUser.username);
    expect(res.body.user).not.toHaveProperty('password');
    expect(res.header['set-cookie']).toBeDefined();
    expect(res.header['set-cookie'][0]).toContain('token=');
  });

  it('should not register user with existing email', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const res = await request(app).post('/api/auth/register').send(testUser);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('email', testUser.email);
    expect(res.header['set-cookie']).toBeDefined();
    expect(res.header['set-cookie'][0]).toContain('token=');
  });

  it('should not login with wrong password', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });

  it('should get current user profile when authenticated', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    const cookie = registerRes.header['set-cookie'];

    const res = await request(app).get('/api/auth/me').set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', testUser.username);
  });

  it('should return 401 for /me when not authenticated', async () => {
    const res = await request(app).get('/api/auth/me');

    expect(res.status).toBe(401);
  });

  it('should clear cookie on logout', async () => {
    const res = await request(app).post('/api/auth/logout');

    expect(res.status).toBe(200);
    expect(res.header['set-cookie'][0]).toContain('token=;');
  });
});
