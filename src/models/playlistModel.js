import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  title: String,
  resume: String,
  image: String,
  genre: String,
  songLiked: [{ type: Schema.Types.ObjectId, ref: "song" }],
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
