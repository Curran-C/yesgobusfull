import * as ApiService from '../service/verifykyc.service';

export const authenticateController = async (req, res) => {
  try {
    const response = await ApiService.authenticate();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const aadhaarKycGenerateOtpController = async (req, res) => {
  try {
    const { access_token, aadhaar_number } = req.body;
    const response = await ApiService.aadhaarKycGenerateOtp(access_token, aadhaar_number);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const aadhaarKycVerifyOtpController = async (req, res) => {
  try {
    const { access_token, otp, ref_id } = req.body;
    const response = await ApiService.aadhaarKycVerifyOtp(access_token, otp, ref_id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const panVerificationController = async (req, res) => {
  try {
    const { access_token, pan } = req.body;
    const response = await ApiService.panVerification(access_token, pan);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const bankAccountVerificationController = async (req, res) => {
  try {
    const { access_token, ifsc, account_number } = req.body;
    const response = await ApiService.bankAccountVerification(access_token, ifsc, account_number);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
