import { signUp, signIn, updateDriver, getDriverById } from '../service/driver.service.js';

export const signUpController = async (req, res) => {
  try {
    const result = await signUp(req.body);
    res.status(result.status).json({ message: result.message, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while registering a driver" });
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
    
    res.status(result.status).json({ message: result.message, token: result.token, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while signing in" });
  }
};

export const updateDriverController = async (req, res) => {
  try {
    const { driverId } = req.params
    const response = await updateDriver(driverId, req.body);
    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while updating driver details",
    })
  }
};

export const getDriverByIdController = async (req, res) => {
  try {
    const { driverId } = req.params
    const response = await getDriverById(driverId);
    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "An error occurred while getting driver details",
    })
  }
};