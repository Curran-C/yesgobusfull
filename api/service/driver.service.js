import Driver from "../modals/driver.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/helper.js";

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
      const message = `
        New user signed up:
        Name: ${newUser.firstName} ${newUser.lastName}
        Email: ${newUser.email}
        Phone: ${newUser.phNum}
        pancard: ${newUser.pancard || ""}
        aadhar: ${newUser.pancard || ""}
        driving license: ${newUser.drivinglicense || ""}
        vehicleNumber:  ${newUser.vehicleNumber || ""}
        Bank details
        
        Acc Holder Name:${newUser.accHolderName}
        Bank Acc Num:${newUser.bankAccNum}
        ifsc:${newUser.ifsc}
      `;
      await sendMail('yesgobus.help@gmail.com', 'New User Sign Up', message);
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

export const updateDriver = async (driverId, newData) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(driverId, 
      {
      ...newData
    },
    {new: true}
    );
    if(!updateDriver) {
      return {
        status: 404,
        message: "Driver not found",
      }
    }
    return {
      status: 200,
      message: "Driver details updated successfully",
      data: updateDriver,
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while updating driver details",
    };
  }
};

export const getDriverById = async (driverId) => {
  try {
    const driver = await Driver.findById(driverId);
    if(!driver) {
      return {
        status: 404,
        message: "Driver not found",
      }
    }
    return {
      status: 200,
      message: "Driver details retrived successfully",
      data: driver,
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "An error occurred while getting driver details",
    };
  }
};