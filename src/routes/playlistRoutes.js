import Router from "express";
import {
  getAllPlaylists,
  getOnePlaylist,
  createPlaylist,
  editPlaylist,
  deletePlaylist,
  deleteSongPlaylist,
} from "../controllers/playlistController";

const playlistRouter = Router();

playlistRouter.get("/all", getAllPlaylists);
playlistRouter.get("/one/:id", getOnePlaylist);
playlistRouter.post("/create", createPlaylist);
playlistRouter.put("/edit/:id", editPlaylist);
playlistRouter.delete("/delete/:id", deletePlaylist);
playlistRouter.delete(":id_play/delete/:id_song", deleteSongPlaylist);

export default playlistRouter;
