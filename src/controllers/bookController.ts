import { Request, Response } from 'express';
import MBook from '../models/book.js';

export const addbook = async (req: Request, res: Response) => {
  const book = new MBook(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getbooks = async (req: Request, res: Response) => {
  try {
    const books = await MBook.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getsinglebook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await MBook.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updatebook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await MBook.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deletebook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await MBook.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
