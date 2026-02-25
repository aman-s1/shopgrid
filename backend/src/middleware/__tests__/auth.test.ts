import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { auth, AuthRequest } from '../auth';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      cookies: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided in cookies', () => {
    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'No token, authorization denied',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next() and attach user to request if token is valid', () => {
    const mockUser = { id: 'user123', role: 'user' };
    mockRequest.cookies = { token: 'valid-token' };
    (jwt.verify as jest.Mock).mockReturnValue(mockUser);

    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String));
    expect(mockRequest.user).toEqual(mockUser);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockRequest.cookies = { token: 'invalid-token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    auth(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Token is not valid',
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
