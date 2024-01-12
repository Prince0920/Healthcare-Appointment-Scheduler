const nodeConstant = require('../config/nodeConstant');

const StripePayHelper = async () => {
  const stripe = require('stripe')(nodeConstant.STRIPE_TEST_SECRET);

  const session = await stripe.checkout.sessions.create({
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

  return session;
};

module.exports = { StripePayHelper };
