import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMessage = async (tid, opPNR, doj, toNumber) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      body: `Your booking confirmation for YesGoBus:\nTicket Number: ${tid}\nopPNR: ${opPNR}\nDeparture Date: ${doj}\nThank you for choosing YesGoBus!`,
      from: '+13159049690',
      to: toNumber
    });
    return message.sid;
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
