import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Function to generate PhonePe X-VERIFY header
const generateXVerify = (payload: string, saltKey: string, saltIndex: number) => {
  const base64Payload = Buffer.from(payload).toString('base64');
  const string = base64Payload + '/pg/v1/pay' + saltKey;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + saltIndex;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, merchantTransactionId, merchantUserId } = body;

    // PhonePe API configuration
    const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
    const SALT_KEY = process.env.PHONEPE_SALT_KEY;
    const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
    const PHONEPE_API_URL = process.env.PHONEPE_API_URL || 'https://api.phonepe.com/apis/hermes';

    // Create payload for PhonePe
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phonepe/callback`,
      mobileNumber: '',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // Generate X-VERIFY header
    const xVerify = generateXVerify(JSON.stringify(payload), SALT_KEY!, parseInt(SALT_INDEX!));

    // Make request to PhonePe API
    const response = await fetch(`${PHONEPE_API_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create PhonePe payment');
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error creating PhonePe payment:', error);
    return NextResponse.json({ 
      error: 'Error creating PhonePe payment' 
    }, { status: 500 });
  }
} 