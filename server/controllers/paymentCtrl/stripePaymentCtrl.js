const userModel = require('../../models/userModels');
const doctorAppointmentModel = require('../../models/doctorAppointment');

const patentPayBystripe = async (req, res) => {
  const recordId = req.body.recordId;
  console.log('Record id ', recordId);

  try {
    const stripe = require('stripe')(
      'sk_test_WgJO1QCjkHTq6enZ5jqcuXt200m2Q37I3j'
    );

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3101/patient/booking/payment-success',
      cancel_url: 'https://localhost:3101/patient/booking/payment-cancel',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: 'price_1OPJ4TCQpJWQbtl1D26mPUL2', // Replace with your actual price ID
          quantity: 1,
        },
      ],
    });

    // window.location = session.url;
    //res.redirect(303, session.url);
    //res.json({ id: session.id });
    const updateBookingPayStatus =
      await doctorAppointmentModel.findByIdAndUpdate(recordId, {
        $set: { paymentStatus: 'completed' },
      });

    console.log('Payment initiated successfully');
    console.error(session.url);
    res.status(201).send({
      success: true,
      message: 'Payment initiation successful',
      url: session.url,
      sessionId: session.id,
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
