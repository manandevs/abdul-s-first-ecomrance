import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cartItems: { type: Object, default: {} },
   //  isSeller: { type: Boolean, default: false },
   //  address: { type: String },
   //  phone: { type: String },
}, { minimize: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;