const nodeConstant = require('../config/nodeConstant');

const StripePay = async (paymenFor) => {
  console.log('paymenFor', paymenFor);

  const stripe = require('stripe')(nodeConstant.STRIPE_TEST_SECRET);
  let session;

  try {
    if (paymenFor === 'appointBooking') {
      //console.log('cameee', paymenFor);

      session = await stripe.checkout.sessions.create({
        success_url: `${nodeConstant.BASE_URL}/patient/booking/payment-success`,
        cancel_url: `${nodeConstant.BASE_URL}/patient/booking/payment-cancel`,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price: 'price_1OPJ4TCQpJWQbtl1D26mPUL2', // Replace with your actual price ID
            quantity: 1,
          },
        ],
      });
    }
    // console.log('Stripe Response', session);
    // return false;
    return session;
  } catch (error) {
    console.log('error in stripe payment', error);
    // Handle the error appropriately, you might want to throw it or log it.
    // res.status(500).send({
    //   success: false,
    //   message: `Issue in stripe payment. Error: ${error.message}`,
    // });
  }
};

module.exports = { StripePay };
