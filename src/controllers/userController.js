import { generateAuthToken } from "../middlewares/auth";
import User from "../models/userModel";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      users,
      message: "Here's a list of all your users.",
    });
  } catch (error) {
    res.json({
      error,
      message: "Oooops ... Users not found",
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      user,
      message: "This is the user you're searching",
    });
  } catch (error) {
    res.json({
      error,
      message: "Oooops ... User not found",
    });
  }
};

const createUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  try {
    const newUser = await User.create({
      userName: userName,
      email: email,
      password: password,
      role: role,
    });
    res.json({
      newUser,
      message: "Your user has been succefully create ",
    });
  } catch (error) {
    res.json({
      error,
      message: "Oooops ... Your user hasn't been create. There is a problem",
    });
  }
};

const editUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log(updateUser);
    res.json({
      updateUser,
      message: "Your user has been succefully updated",
    });
  } catch (error) {
    res.json({
      error,
      message: "Ooooops ... A problem was detected when updating your user.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removeUser = await User.findByIdAndDelete(req.params.id);
    res.json({
      removeUser,
      message: "Your user has been succefully deleted",
    });
  } catch (error) {
    res.json({
      error,
      message: "Ooooops ... A problem was detected when you deleted your user.",
    });
  }
};

const register = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.userName = req.body.userName;
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.role = req.body.role;
    newUser.save();

    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
};

const connexion = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const verify = await user.verifPass(password, user.password);

    if (!verify) {
      const error = new Error("Invalid password");
      throw error;
    }
    const token = generateAuthToken(user);
    console.log(user);
    res.json({ user, token, message: "You are connected" });
  } catch (error) {
    res.send(error.message);
  }
};
export {
  getAllUsers,
  getOneUser,
  createUser,
  register,
  connexion,
  editUser,
  deleteUser,
};
