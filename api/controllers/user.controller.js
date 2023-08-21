import { signUp, signIn } from '../service/user.service.js';

export const signUpController = async (req, res) => {
  try {
    const result = await signUp(req.body);
    res.status(result.status).json({ message: result.message, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while registering a user" });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    
    if (result.status === 200) {
      res.cookie("token", result.token, {
        // httpOnly: true, 
        maxAge: 3600000, 
      });
    }
    
    res.status(result.status).json({ message: result.message, token: result.token });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};
