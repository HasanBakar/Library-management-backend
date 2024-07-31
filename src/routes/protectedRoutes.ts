import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/admin', auth(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

router.get('/librarian', auth(['admin', 'librarian']), (req, res) => {
  res.status(200).json({ message: 'Welcome Librarian' });
});

export default router;
