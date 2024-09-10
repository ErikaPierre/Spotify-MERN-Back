import Playlist from "../models/playlistModel";
import Song from "../models/songModel";
import User from "../models/userModel";

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllSongsLiked = async (req, res) => {
  try {
    const songsLikes = await User.findById(req.params.userId).populate(
      "songsLiked"
    );
    res.json({
      release: songsLikes,
      Message: "Release successfully added to playlistLiked",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createSong = async (req, res) => {
  const { title, artist, album, time, source, gender } = req.body;
  try {
    const newSong = await Song.create({
      title: title,
      artist: artist,
      album: album,
      time: time,
      source: source,
      gender: gender,
    });
    res.json({ newSong, message: "Your music has been succefully create " });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const insertSongToLikes = async (req, res) => {
  try {
    const newSongAdd = await Song.findById(req.params.id_song);
    const userLikes = await User.findById(req.params.id_user);
    userLikes.songsLiked.push(newSongAdd);
    userLikes.save();
    res.json({
      newSongAdd,
      message: "Your music has been succefully add to your likes ",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const insertSongToPlaylist = async (req, res) => {
  try {
    const songAdded = await Song.findById(req.params.id_song);
    const userPlaylists = await Playlist.findById(req.params.id_play);
    userPlaylists.songLiked.push(songAdded._id);
    userPlaylists.save();
    res.json({
      songAdded,
      message: "Your music has been succefully add to your playlist ",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editSong = async (req, res) => {
  try {
    const updateSong = await Song.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({
      updateSong,
      message: "Your music has been succefully updated",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteSong = async (req, res) => {
  try {
    const removeSong = await Song.findOneAndDelete({ _id: req.params.id });
    res.json({
      removeSong,
      message: "Your music has been succefully deleted",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deletedSongPlaylist = async (req, res) => {
  try {
    const removeSong = await Song.findById(req.params.id_song);
    const userPlaylists = await Playlist.findById(req.params.id_play);
    userPlaylists.songLiked.pop(removeSong._id);
    userPlaylists.save();
    res.json({
      removeSong,
      message: "Your music has been succefully remove to your playlist ",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export {
  getAllSongs,
  getAllSongsLiked,
  getOneSong,
  createSong,
  insertSongToLikes,
  insertSongToPlaylist,
  editSong,
  deleteSong,
  deletedSongPlaylist,
};
