import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
 
const router = express.Router();

//Edit User 
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send(updatedUser);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("Not Allowed");
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User Deleted");
      } catch (err) {
        res.send(err);
      }
    } catch (err) {
      res.send("User not found!");
    }
  } else {
    res.send("Not Allowed");
  }
});

//Get Particular User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.send(err);
  }
});

export const contactRoute = router;
