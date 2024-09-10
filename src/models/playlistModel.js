import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  title: String,
  resume: String,
  image: String,
  gender: String,
  songLiked: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
