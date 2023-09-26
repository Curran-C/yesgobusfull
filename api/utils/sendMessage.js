import twilio from 'twilio';

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

