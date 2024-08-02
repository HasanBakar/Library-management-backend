import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
  isbn: number;
  name: string;
  author: string;
  description?: string;
  quantity: number;
  issued: number;
  price: number;
  image?: string;
  category: string;
  status: 'available' | 'checked out' | 'reserved';
}

const BookSchema: Schema<IBook> = new Schema(
  {
    isbn: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    issued: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'checked out', 'reserved'],
      default: 'available',
    },
  },
  { timestamps: true },
);

const MBook = mongoose.model<IBook>('Book', BookSchema);
export default MBook;
