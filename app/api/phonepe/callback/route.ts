import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Function to verify PhonePe response
const verifyResponse = (response: string, saltKey: string, saltIndex: number) => {
  const string = response + '/pg/v1/status' + saltKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + saltIndex;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantTransactionId, code, success } = body;

    // PhonePe API configuration
    const SALT_KEY = process.env.PHONEPE_SALT_KEY;
    const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
    const PHONEPE_API_URL = process.env.PHONEPE_API_URL || 'https://api.phonepe.com/apis/hermes';

    // Verify the payment status
    const response = await fetch(`${PHONEPE_API_URL}/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': verifyResponse(merchantTransactionId, SALT_KEY!, parseInt(SALT_INDEX!))
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify payment status');
    }

    // Return the payment status
    return NextResponse.json({
      success: data.success,
      code: data.code,
      message: data.message,
      merchantTransactionId: data.merchantTransactionId
    }, { status: 200 });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Error verifying payment' 
    }, { status: 500 });
  }
} 