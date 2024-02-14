const userModel = require('../../models/userModels');
const doctorAppointmentModel = require('../../models/doctorAppointment');
const nodeConstant = require('../../config/nodeConstant');
const stripePaymentHelper = require('../../utils/stripePayHelper');
const paypal = require('@paypal/checkout-server-sdk');
// PayPal credentials
const clientId =
  'AQR7lKD9RH_-9qmJNeKjN7mB9TOpoLqYPY3a6Ly16vE-SgNmSHqSkBQLERs5dPHI6UIyOqGARGjv0n3v';
const clientSecret =
  'EFJD0erljD8fT-C_xY2zvFa5hZU-5JVoMhCROdwMNdsp587ASkq4kJaE9pyXHFXUW8rNPjn9EYlCChF2';

// Set up PayPal environment and client
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const patentPayByPaypal = async (req, res) => {
  // Uncomment the following line if needed for debugging
  // console.log("paypal request body", req.body);
  try {
    const cartData = req.body;

    // Placeholder functions for items, totals, and shipping cost
    // const items = getItemDetails(cartData); // Should be an array with objects.
    // const priceTotal = calculateTotals(cartData); // Should be a number with 2 decimals
    // const finalSum = updateWithShippingCost(cartData);
    // const shippingFee = finalSum - priceTotal;

    // Create a request object for PayPal transaction
    let request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'PUHF',
          description: 'Payment for XY company',
          soft_descriptor: 'A paypal test payment',
          amount: {
            currency_code: 'USD',
            value: 10, // Replace with the actual value or variable
          },
          // items: items, // Uncomment when items are properly defined
        },
      ],
    });

    // ...

    // Execute the PayPal request and get the response with the order id
    const response = await client.execute(request);
    //console.log(`Response: ${JSON.stringify(response)}`);
    const orderID = response.result.id;
    //console.log(`Order: ${JSON.stringify(response.result)}`);

    // Send the order ID in the JSON response
    const resJson = { orderID };
    res.json(resJson);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

const capturePaypalPayment = async (req, res) => {
  const orderID = req.body.orderID;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  try {
    const capture = await client.execute(request);
    // console.log(`Response: ${JSON.stringify(capture)}`);
    // console.log(`Capture: ${JSON.stringify(capture.result)}`);
    const result = capture.result;
    // const resJson = {
    //   result,
    // };
    // res.json(resJson);
    res.status(200).send({
      response: capture.result,
    });
    // return capture.result;
  } catch (err) {
    // Handle any errors from the call
    console.error(err);
    return res.status(500);
  }
};

module.exports = { patentPayByPaypal, capturePaypalPayment };
