import asyncHandler from "express-async-handler";
import user from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// post method
// /api/users/login
// access=public

const authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const users = await user.findOne({ email });
  if (users && (await users.matchPassword(password))) {
    res.json({
      _id: users._id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
      token: generateToken(users._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

// post method
// /api/users
// access=public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await user.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const users = await user.create({
    name,
    email,
    password,
  });

  if (users) {
    res.status(201).json({
      _id: users._id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
      token: generateToken(users._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// Get method
// /api/users/profile
// access=privet

const getUserProfile = asyncHandler(async (req, res) => {
  const users = await user.findById(req.user._id);

  if (users) {
    res.json({
      _id: users._id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});
// put method
// /api/users/profile
// access=privet

const updateUserProfile = asyncHandler(async (req, res) => {
  const users = await user.findById(req.user._id);

  if (users) {
    users.name = req.body.name || users.name;
    users.email = req.body.email || users.email;
    if (req.body.password) {
      users.password = req.body.password;
    }

    const updateUsers = await users.save();
    res.json({
      _id: updateUsers._id,
      name: updateUsers.name,
      email: updateUsers.email,
      isAdmin: updateUsers.isAdmin,
      token: generateToken(updateUsers._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

// Get method
// /api/users
// access=ADMIN

const getUsers = asyncHandler(async (req, res) => {
  const users = await user.find();
  res.json(users);
});

// delete method
// /api/users/:id
// access=ADMIN

const deleteUsers = asyncHandler(async (req, res) => {
  const users = await user.findById(req.params.id);

  if (users) {
    await users.remove();
    res.json({ message: "user remove" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// Get method
// /api/users/:id
// access=ADMIN

const getById = asyncHandler(async (req, res) => {
  const users = await user.findById(req.params.id).select("-password");

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// put method
// /api/users/:id
// access=privet

const updateUser = asyncHandler(async (req, res) => {
  const users = await user.findById(req.params.id);

  if (users) {
    users.name = req.body.name || users.name;
    users.email = req.body.email || users.email;
    users.isAdmin = req.body.isAdmin;

    const updateUsers = await users.save();
    res.json({
      _id: updateUsers._id,
      name: updateUsers.name,
      email: updateUsers.email,
      isAdmin: updateUsers.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});

export {
  authuser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getById,
  updateUser,
};
