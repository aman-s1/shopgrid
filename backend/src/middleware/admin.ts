import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth'; // Assuming we can export AuthRequest or just use a local one
import User from '../models/User';

export const admin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error in admin middleware' });
  }
};
