import mongoose, { Schema } from 'mongoose';

export interface User {
    fname: string;
    lname: string;
    phone: number;
    email: string;
    password: string;
}

export interface UserModel extends User {}

const UserSchema = new Schema(
    {
        fname: { type: 'String', required: true },
        lname: { type: 'String', required: true },
        phone: { type: 'Number', required: true, unique: true },
        email: { type: 'String', required: true, unique: true },
        password: { type: 'String', required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<UserModel>("User",UserSchema)