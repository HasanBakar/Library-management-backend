import {
  addbook,
  deletebook,
  getbooks,
  getsinglebook,
  updatebook,
} from '../controllers/bookController.js';
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// This route is used to add a new book
router.post('/', auth(['admin', 'librarian']), addbook);

// This route is used to get all books
router.get('/', getbooks);

// This route is used to get a single book by ID
router.get('/:id', getsinglebook);

// This route is used to update a book by ID
router.put('/:id', auth(['admin', 'librarian']), updatebook);

// This route is used to delete a book by ID
router.delete('/:id', auth(['admin']), deletebook);

export default router;
