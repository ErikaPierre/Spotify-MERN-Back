import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
  const tokerHeader = req.headers.authorization;
  const token = tokerHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Missing token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Your token is invalid." });
  }
};

const generateAuthToken = (userData) => {
  const payload = {
    id: userData.id,
    userName: userData.userName,
    email: userData.email,
    role: userData.role,
    playlistsLiked: userData.playlistsLiked,
    songsLiked: userData.songsLiked,
  };
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export { auth, generateAuthToken };
