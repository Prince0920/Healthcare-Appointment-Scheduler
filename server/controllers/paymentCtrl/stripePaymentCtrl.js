const userModel = require('../../models/userModels');

const patentPayBystripe = async (req, res) => {
  try {
    const stripe = require('stripe')(
      'sk_test_WgJO1QCjkHTq6enZ5jqcuXt200m2Q37I3j'
    );

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://localhost:3101/success',
      cancel_url: 'https://localhost:3101/cancel',
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
