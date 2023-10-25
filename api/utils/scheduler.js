import schedule from 'node-schedule';
import { sendMessage } from './helper.js';
import BusBooking from "../modals/busBooking.modal.js";
import { checkPaymentStatus, refundPayment } from '../service/payment.service.js';

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

const checkPaymentAndRefund = async () => {
  try {
    const bookings = await BusBooking.find({
      bookingStatus: 'pending',
    });
    for (const booking of bookings) {
      const requestData = {
        merchantTransactionId: booking.merchantTransactionId,
      }
      const paymentStatus = await checkPaymentStatus(requestData);
      if (paymentStatus.success) {
        await BusBooking.findByIdAndUpdate(booking._id, {
          bookingStatus: 'failed',
        });
        const refundData = {
          amount: booking.totalAmount,
          merchantTransactionId: booking.merchantTransactionId,
        }
        await refundPayment(refundData);
      }
    }
  } catch (error) {
    console.error('Error checking payment status and refunding:', error);
  }
}

const sendReminderJob = schedule.scheduleJob('* * * * * *', function () {
  // sendReminderMessages();
});

const checkPaymentJob = schedule.scheduleJob('0 0 * * *', function () {
  checkPaymentAndRefund();
});

export { sendReminderJob, checkPaymentJob };