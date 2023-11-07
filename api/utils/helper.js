// import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMessage = async (message, to, templateId) => {
  try {
    const authKey = process.env.AUTH_KEY;
    const senderId = process.env.SENDER_ID;
    const baseUrl = "http://sms.chotaweb.com/api/sendhttp.php";
    const response = axios.get(`${baseUrl}?
    authkey=${authKey}&
    mobiles=91${to}&
    message=${message}&
    sender=${senderId}&
    route=4&
    country=91&
    DLT_TE_ID=${templateId}
    `);
    if(response) {
      return {
        status: 200,
        message: "SMS sent successfully",
      }
    }
  } catch (error) {
    console.error('Error sending message:', error.message);
    throw error.message;
  }
};

export const sendMail = async (to, subject, message) => {
  try {
    const msg = {
      to: to,
      from: "yesgobus.help@gmail.com",
      subject: subject,
      text: message,
    };
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
      })
      .catch((error) => {
        console.error(error)
      })

  } catch (error) {
    console.error('Error sending message:', error);
    throw error.message;
  }
};
