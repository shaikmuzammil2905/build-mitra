const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_live_U3Cm82CFvT9y1U';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'm8D0wiKfnih1TaC4NEfyKUr5';

const razorpayInstance = new Razorpay({
  key_id,
  key_secret
});

/**
 * Create a new Razorpay Order
 * @param {number} amountInRupees e.g. 20 for ₹20 PDF report
 * @param {string} receiptId unique receipt tag
 * @param {object} notes additional metadata
 */
async function createOrder(amountInRupees, receiptId, notes = {}) {
  const options = {
    amount: Math.round(amountInRupees * 100), // amount in paise
    currency: 'INR',
    receipt: receiptId || `rcpt_${Date.now()}`,
    notes: {
      platform: 'BuildMitra',
      ...notes
    }
  };

  const order = await razorpayInstance.orders.create(options);
  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    keyId: key_id
  };
}

/**
 * Verify Razorpay payment signature
 * HMAC-SHA256(order_id + "|" + payment_id, secret) == signature
 */
function verifyPaymentSignature(orderId, paymentId, signature) {
  if (!orderId || !paymentId || !signature) return false;

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
}

module.exports = {
  razorpayInstance,
  key_id,
  createOrder,
  verifyPaymentSignature
};
