import { Router } from "express";
import {
  createSong,
  deleteSong,
  editSong,
  getAllSongs,
  getOneSong,
  insertSongPlaylist,
} from "../controllers/songController";

const songRouter = Router();

songRouter.get("/all", getAllSongs);
songRouter.get("/:id", getOneSong);
songRouter.post("/create", createSong);
songRouter.post("/:id_song/addtoplaylist/:id_play", insertSongPlaylist);
songRouter.put("/update/:id_song", editSong);
songRouter.delete("/remove/:id_song", deleteSong);

export default songRouter;
