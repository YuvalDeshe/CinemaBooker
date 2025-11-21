import mongoose, { Schema, Document, models, Model } from 'mongoose';
import { ISODateString } from 'next-auth';

interface IUser extends Document {
    email: string;
    password?: string;
    passwordResetToken?: string;
    passwordResetExpires?: ISODateString;
    // add more details as needed. these are the only ones necessary for login/register.
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    }
}, { timestamps: true });

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', userSchema);

export default User;
export type { IUser };
