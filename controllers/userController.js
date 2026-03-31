import User from "../models/user.js";
import Todo from "../models/todo.js";
import mongoose from "mongoose";

export const updateChange = async (req, res) => {
  const { user, name, profile } = req.body;

  if (!name && !profile)
    return res.status(400).json({ success: false, message: "bad request" });

  try {
    const ThatUser = await User.findOne({ email: user });
    if (!ThatUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (!profile && name) {
      ThatUser.name = name;
    } else if (profile && !name) {
      ThatUser.profilePic = profile;
    } else {
      ThatUser.profilePic = profile;
      ThatUser.name = name;
    }
    await ThatUser.save();
    return res.status(200).json({ success: true, message: "updated" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const { uid } = req.params;
  if (!uid)
    return res.status(400).json({ success: false, message: "Bad request" });

  const db = mongoose.connection.db;

  try {
    const user = await User.findOne({uID: uid});
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    await Todo.deleteMany({ from_user: user.email });

    const nextAuthUser = await db
      .collection("auth_users")
      .findOne({ email: user.email });
    if (!nextAuthUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const id = nextAuthUser._id;
    await db.collection("auth_users").deleteOne({ _id: id });
    await db.collection("auth_accounts").deleteOne({ userId: id });

    await User.deleteOne({ email: user.email });
    return res.status(200).json({ success: true, message: "deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
