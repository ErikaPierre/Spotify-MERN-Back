import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: {
    type: String,
    min: [6, " Your password is too small, minimum 6 characters"],
  },
  playlistLiked: [{ type: Schema.Types.ObjectId, ref: "playlist" }],
  songLiked: [{ type: Schema.Types.ObjectId, ref: "song" }],
});

userSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

userSchema.methods.verifPass = async (password, elderPassword) => {
  const result = await bcrypt.compare(password, elderPassword);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
