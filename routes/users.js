import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

// the user model
const userSchema = {
  name: String,
  email: String,
  age: Number,
  country: String,
  password: String,
};

const filterPassword = (user) => ({
  ...user,
  password: undefined,
});

// GET /users
router.get("/", (req, res) => {
  res.json(users.map(filterPassword)); // Remove passwords before sending
});

// POST /users
router.post("/", (req, res) => {
  const user = req.body;
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);
  res.send(`User with name ${user.name} is added in database.`);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (foundUser) {
    res.json(filterPassword(foundUser)); // Filter password
  } else {
    res.status(404).send("User not found");
  }
});

// PUT /users/:id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age, country } = req.body; // Exclude password
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], name, email, age, country };
    users[userIndex] = updatedUser;
    res.send(`User with the id ${id}  has been updated.`);
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`User with the name ${id} is deleted from the database`);
});

export default router;
