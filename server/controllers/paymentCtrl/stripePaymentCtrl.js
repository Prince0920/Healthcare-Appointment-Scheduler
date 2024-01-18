const userModel = require('../../models/userModels');
const doctorAppointmentModel = require('../../models/doctorAppointment');
const nodeConstant = require('../../config/nodeConstant');
const stripePaymentHelper = require('../../utils/stripePayHelper');

const patentPayBystripe = async (req, res) => {
  const recordId = req.body.recordId;
  console.log('Record id ', recordId);
  try {
    // const stripe = require('stripe')(nodeConstant.STRIPE_TEST_SECRET);
    // const session = await stripe.checkout.sessions.create({
    //   success_url: `${nodeConstant.BASE_URL}/patient/booking/payment-success`,
    //   cancel_url: `${nodeConstant.BASE_URL}/patient/booking/payment-cancel`,
    //   payment_method_types: ['card'],
    //   mode: 'payment',
    //   line_items: [
    //     {
    //       price: 'price_1OPJ4TCQpJWQbtl1D26mPUL2', // Replace with your actual price ID
    //       quantity: 1,
    //     },
    //   ],
    // });

    // window.location = session.url;
    //res.redirect(303, session.url);
    //res.json({ id: session.id });

    const sessionRes = await stripePaymentHelper.StripePay('appointBooking');
    //console.log('sessionRes', sessionRes);

    //return false;

    // const updateBookingPayStatus =
    //   await doctorAppointmentModel.findByIdAndUpdate(recordId, {
    //     $set: { paymentStatus: 'completed' },
    //   });

    //console.log('Payment initiated successfully');
    // console.error(sessionRes.url);
    res.status(201).send({
      success: true,
      message: 'Payment initiation successful',
      url: sessionRes.url,
      sessionId: sessionRes.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Issue in stripe payment. Error: ${error.message}`,
    });
  }
};

module.exports = { patentPayBystripe };
