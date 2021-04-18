import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin: Boolean,
});

const User = mongoose.model("User", UserSchema);

export default User;
