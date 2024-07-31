import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type IUserResponse = Omit<
  IUser,
  | 'password'
  | 'comparePassword'
  | '$assertPopulated'
  | '$clearModifiedPaths'
  | '$clone'
  | string
> & {
  _id: unknown;
  name: string;
  email: string;
  role: string;
};

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'patron' | 'librarian' | 'admin' | 'reader';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['patron', 'librarian', 'admin', 'reader'],
      required: true,
      default: 'reader',
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const MUser = mongoose.model<IUser>('User', UserSchema);
