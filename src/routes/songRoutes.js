import { Router } from "express";
import {
  getAllSongs,
  getOneSong,
  insertSongToLikes,
  insertSongToPlaylist,
  createSong,
  editSong,
  deleteSong,
  deletedSongPlaylist,
} from "../controllers/songController";

const songRouter = Router();

songRouter.get("/all", getAllSongs);
songRouter.get("/:id", getOneSong);
songRouter.post("/create", createSong);
songRouter.post("/:id_song/addToLikes/:id_user", insertSongToLikes);
songRouter.post("/:id_song/addToPlaylist/:id_play", insertSongToPlaylist);
songRouter.put("/edit/:id", editSong);
songRouter.delete("/delete/:id", deleteSong);
songRouter.delete("/:id_song/deleteToPlaylist/:id_play", deletedSongPlaylist);

export default songRouter;
