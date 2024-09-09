import { Router } from "express";
import { connexion, register } from "../controllers/userController";
import {
  createPlaylist,
  deletePlaylist,
  deleteSongPlaylist,
  getAllPlaylists,
  getAllPlaylistsLiked,
  getOnePlaylist,
} from "../controllers/playlistController";
import {
  deleteSong,
  getAllSongs,
  getAllSongsLiked,
  getOneSong,
} from "../controllers/songController";

const userRouter = Router();

userRouter.post("/inscription", register);
userRouter.post("/connexion", connexion);
userRouter.get("/playlists", getAllPlaylists);
userRouter.get("/songs", getAllSongs);
userRouter.get("/:id", getOneSong);
userRouter.get("/:id", getOnePlaylist);
userRouter.get("/liked_playlists", getAllPlaylistsLiked);
userRouter.get("/liked_songs", getAllSongsLiked);
userRouter.post("/create", createPlaylist);
userRouter.delete("/delete/:id", deletePlaylist);
userRouter.delete("/delete/:id", deleteSong);
userRouter.delete("/:id_play/delete/:id_song", deleteSongPlaylist);

export default userRouter;
