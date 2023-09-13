import Driver from "../modals/driver.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (userData) => {
  try {
    const existingUser = await Driver.findOne({ email: userData.email });
    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(userData.password, 5);
      const newUser = new Driver({
        ...userData,
        password: hashedPassword,
      });
      await newUser.save();
      
      return {
        status: 200,
        message: "SignUp Successful",
        data: newUser,
      };
    } else {
      return {
        status: 200,
        message: "User already exists",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

export const signIn = async (email, password) => {
  try {
    const existingUser = await Driver.findOne({ email });
    if (!existingUser) {
      return {
        status: 401,
        message: "User not found",
      };
    }
    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password",
      };
    }
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    
    return {
      status: 200,
      message: "Successfully signed in",
      token: token,
      data: existingUser,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};
