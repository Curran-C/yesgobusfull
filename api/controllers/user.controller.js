import User from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register new user
export const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).send({message: "SignUp Successfull", data: newUser});
    } else {
      res.status(200).send({ message: "User already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

//sign in user
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      // httpOnly: true, 
      maxAge: 3600000, 
    });
    res.status(200).send({ message: "Successfully signed in", token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
