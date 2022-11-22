import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

//Signing up 
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      firstName :req.body.FirstName,
      lastName :req.body.LastName,
      phoneNumber : req.body.phoneNumber,
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      Company:req.body.company,
      Occupation:req.body.Occupation,
      dob:req.body.dob
    });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Log In
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Invalid credentials!");

    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

export const authRoute = router;