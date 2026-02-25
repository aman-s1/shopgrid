import request from 'supertest';
import app from '../../server';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('Product Routes', () => {
  let adminCookie: string[];
  let userCookie: string[];

  beforeEach(async () => {
    const adminUser = new User({
      username: 'adminuser',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });
    await adminUser.save();

    const adminToken = jwt.sign(
      { id: adminUser._id, role: 'admin' },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    adminCookie = [`token=${adminToken}`];

    const regularUser = new User({
      username: 'regularuser',
      email: 'user@test.com',
      password: 'password123',
    });
    await regularUser.save();

    const userToken = jwt.sign(
      { id: regularUser._id, role: 'user' },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    userCookie = [`token=${userToken}`];
  });

  describe('GET /api/products', () => {
    it('should fetch products with pagination', async () => {
      const res = await request(app).get('/api/products?page=1&limit=10');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('products');
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination).toHaveProperty('totalItems');
      expect(res.body.pagination).toHaveProperty('totalPages');
    });
  });

  describe('POST /api/products', () => {
    const newProduct = {
      title: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      category: 'Electronics',
      image: 'http://example.com/image.jpg',
      condition: 'New',
    };

    it('should allow admin to create a product', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Cookie', adminCookie)
        .send(newProduct);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('title', newProduct.title);
    });

    it('should return 403 for non-admin user', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Cookie', userCookie)
        .send(newProduct);

      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error', 'Access denied. Admin only.');
    });

    it('should return 401 for unauthenticated user', async () => {
      const res = await request(app).post('/api/products').send(newProduct);

      expect(res.status).toBe(401);
    });

    it('should return 400 for invalid product data', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Cookie', adminCookie)
        .send({ title: '' });

      expect(res.status).toBe(400);
    });
  });
});
