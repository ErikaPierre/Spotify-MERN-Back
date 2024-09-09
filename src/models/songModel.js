import mongoose from "mongoose";
import { Schema } from "mongoose";

const songSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  time: String,
  gender: String,
  source: String,
  playlistLiked: [{ type: Schema.Types.ObjectId, ref: "playlist" }],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Song = mongoose.model("Song", songSchema);

export default Song;
