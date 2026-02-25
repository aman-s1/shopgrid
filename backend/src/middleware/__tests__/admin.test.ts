import { Response, NextFunction } from 'express';
import { admin } from '../admin';
import { AuthRequest } from '../auth';
import User from '../../models/User';

jest.mock('../../models/User');

describe('Admin Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      user: { id: 'admin123', role: 'admin' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should call next() if user is an admin', async () => {
    (User.findById as jest.Mock).mockResolvedValue({
      _id: 'admin123',
      role: 'admin',
    });

    await admin(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(User.findById).toHaveBeenCalledWith('admin123');
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 403 if user is not an admin', async () => {
    (User.findById as jest.Mock).mockResolvedValue({
      _id: 'user123',
      role: 'user',
    });

    await admin(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Access denied. Admin only.',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 403 if user not found', async () => {
    (User.findById as jest.Mock).mockResolvedValue(null);

    await admin(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 500 on server error', async () => {
    (User.findById as jest.Mock).mockRejectedValue(new Error('DB error'));

    await admin(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Server error in admin middleware',
    });
  });
});
