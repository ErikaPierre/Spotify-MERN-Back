import Playlist from "../models/playlistModel";
import Song from "../models/songModel";
import User from "../models/userModel";

const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllSongsLiked = async (req, res) => {
  try {
    const songsLikes = await User.findById(req.params.userId).populate(
      "playlistLiked"
    );
    res.json({
      release: songsLikes,
      Message: "Release successfully added to playlistLiked",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneplaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("song");
    res.json(playlist);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// const createPlaylist = async (req, res) => {
//   const { title } = req.body;
//   const { description } = req.body;

//   try {
//     const existingPlaylist = await Playlist.findOne({
//       title,
//       user: "659ec5508a09a25b832cb779",
//     });

//     if (existingPlaylist) {
//       return res
//         .status(400)
//         .json({ message: "Une playlist avec ce nom existe déjà." });
//     }

//     const newPlaylist = await Playlist.create({
//       title: title,
//       description: description,
//       image: req.file ? req.file.path : null,
//     });
//     // imagePath = newPlaylist.image;
//     res.json({
//       newPlaylist,
//       // imagePath,
//       message: "Your playlist has been succefully create ",
//     });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };

const createPlaylist = async (req, res) => {
  const { title, resume, artist, gender } = req.body;
  const image = req.file.filename;
  try {
    const newPlaylist = await Playlist.create({
      title: title,
      resume: resume,
      artist: artist,
      gender: gender,
      image: image,
    });
    await newPlaylist.save();
    res.json({ newSong, message: "Your playlist has been succefully create " });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editPlaylist = async (req, res) => {
  try {
    const updatePlaylist = await Playlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      updatePlaylist,
      message: "Your playlist has been succefully updated ",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const deletePlaylist = await Playlist.findByIdAndDelete(req.params.id);
    res.json({
      deletePlaylist,
      message: "Your playlist has been succefully deleted ",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteSongPlaylist = async (req, res) => {
  try {
    const playlistID = await Playlist.findById(req.params.id_play);
    const removeSong = await Song.findById(req.params.id_song);
    res.json({
      removeSong,
      message: "Your music has been succefully delete from your playlist ",
    });
    playlistID.song.pull(removeSong);
    playlistID.save();
  } catch (error) {
    res.json({ error: error.message });
  }
};

export {
  getAllPlaylist,
  getAllSongsLiked,
  getOneplaylist,
  createPlaylist,
  editPlaylist,
  deletePlaylist,
  deleteSongPlaylist,
};
