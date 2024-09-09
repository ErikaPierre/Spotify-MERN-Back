import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  title: String,
  resume: String,
  songLiked: [{ type: Schema.Types.ObjectId, ref: "song" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  image: String,
  genre: String,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
