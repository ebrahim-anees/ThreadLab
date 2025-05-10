import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const baseURL = process.env.PAYPAL_API;

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await axios.post(
    `${baseURL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

export const createPaypalOrder = async (
  amount,
  cartItems,
  currency = 'USD'
) => {
  const token = await getAccessToken();

  const items = cartItems.map((item) => ({
    name: item.title,
    sku: item.productId,
    quantity: item.quantity.toString(),
    unit_amount: {
      currency_code: currency,
      value: item.price.toFixed(2),
    },
  }));

  const response = await axios.post(
    `${baseURL}/v2/checkout/orders`,
    {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
            breakdown: {
              item_total: {
                currency_code: currency,
                value: amount,
              },
            },
          },
          items,
        },
      ],
      application_context: {
        return_url: 'http://localhost:5173/shop/paypal/return',
        cancel_url: 'http://localhost:5173/shop/paypal/cancel',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const capturePaypalOrder = async (orderId) => {
  try {
    const token = await getAccessToken();

    const requestId = uuidv4();

    const response = await axios.post(
      `${baseURL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': requestId,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Log the error in case of failure
    console.error(
      'Error capturing PayPal order:',
      error.response?.data || error.message
    );
    throw new Error('Error capturing PayPal order');
  }
};
