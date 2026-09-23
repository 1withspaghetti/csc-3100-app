import mongoose, { type Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId
    name: string;
    job: string;
}

export const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    job: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
