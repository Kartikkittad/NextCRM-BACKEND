import User from "../models/User.js";

export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
