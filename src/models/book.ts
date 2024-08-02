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
    isbn: {
      type: Number,
      required: [true, 'ISBN is required'],
      unique: true,
      validate: {
        validator: Number.isInteger,
        message: 'ISBN must be an integer',
      },
    },
    name: {
      type: String,
      required: [true, 'Book name is required'],
      minlength: [3, 'Book name must be at least 3 characters long'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      minlength: [3, 'Author name must be at least 3 characters long'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    issued: {
      type: Number,
      default: 0,
      min: [0, 'Issued quantity cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /\.(jpg|jpeg|png|gif)$/.test(value);
        },
        message:
          'Image must be a valid URL ending with .jpg, .jpeg, .png, or .gif',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    status: {
      type: String,
      enum: ['available', 'checked out', 'reserved'],
      default: 'available',
    },
  },
  { timestamps: true },
);

// Ensure indexes are created
BookSchema.index({ isbn: 1 }, { unique: true });

const MBook = mongoose.model<IBook>('Book', BookSchema);

MBook.on('index', (error) => {
  if (error) {
    console.error('Index creation failed', error);
  }
});

export default MBook;
