import config from '../config/config.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

const auth = (roles: string[] = []) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token)
        return res
          .status(401)
          .json({ message: 'No token, authorization denied' });

      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;

      if (roles.length && !roles.includes(req?.user?.role as string)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

export default auth;
