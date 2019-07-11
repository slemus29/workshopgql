import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
});

export default mongoose.model("User", UserSchema, 'users');
