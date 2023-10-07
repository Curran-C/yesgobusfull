import schedule from 'node-schedule';
import { sendMessage } from './helper.js';
import BusBooking from "../modals/busBooking.modal.js";

const sendReminderMessages = async () => {
  try {
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    const bookings = await BusBooking.find({
      doj: { $lte: oneHourFromNow },
      sentBookingRemainer: false,
      bookingStatus: "paid", 
    });
    const templateId = process.env.TEMP;
    for (const booking of bookings) {
      await sendMessage(`Your bus booking is in 1 hour!`, booking.customerPhone, templateId);
      await BusBooking.findByIdAndUpdate(booking._id, {
        sentBookingRemainer: true,
      })
    }
    console.log('Reminder messages sent successfully.');
  } catch (error) {
    console.error('Error sending reminder messages:', error);
  }
}


const job = schedule.scheduleJob('* * * * *', function(){
  // sendReminderMessages();
});

export default job;