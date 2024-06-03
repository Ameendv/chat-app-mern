import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    console.log(
      "🚀 ~ signup ~ { fullName, userName, password, confirmPassword, gender }:",
      { fullName, userName, password, confirmPassword, gender }
    );
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords doesnt match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //hash password here
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy/?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl/?userName=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //generate jwt token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({ result: newUser });
    } else {
      res.status(400).json({ error: "Invalid User details" });
    }
  } catch (error) {
    console.log("🚀 ~ signup ~ error:", error);
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
