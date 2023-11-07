import {
  signUp,
  signIn,
  googleSignUp,
  facebookSignUp,
  updateUserProfile,
} from "../service/user.service.js";

export const signUpController = async (req, res) => {
  try {
    const result = await signUp(req.body);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while registering a user" });
  }
};

export const signInController = async (req, res) => {
  try {
    const { emailMobile, password } = req.body;

    const result = await signIn(emailMobile, password);
    if (result.status === 200) {
      res.cookie("token", result.token, {
        // httpOnly: true,
        maxAge: 3600000,
      });
    }

    res.status(result.status).json({
      message: result.message,
      data: result.data,
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

export const googleSignInController = async (req, res) => {
  try {
    const { jwtToken } = req.body;
    const result = await googleSignUp(jwtToken);
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

export const facebookSignInController = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await facebookSignUp({ name, email });
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

export const updateUserProfileController = async (req, res) => {
  try {
    const { userId } = req.params
    const result = await updateUserProfile(userId, req.body);
    res.status(result.status).send(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};