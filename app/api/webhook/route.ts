import axios from 'axios';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    sendTemplateMessage(body.phone);

    return NextResponse.json(
      { message: "Success" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function sendTemplateMessage(recipientPhone:string) {
  // 1. Configuration
  const token = process.env.WHATSAPP_ACCESS_TOKEN; // From Meta App Dashboard
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // From Meta App Dashboard

  const url = `https://crm.chatnation.co.ke/api/meta/v19.0/${phoneNumberId}/messages`;


  // 3. The Payload
  // This JSON replaces the "Body" section you saw in Zapier
  const data = {
    "to": recipientPhone,
    "recipient_type": "individual",
    "type": "template",
    "template": {
        "language": {
            "policy": "deterministic",
            "code": "en_US"
        },
        "name": "november_sales",
        "components": []
    }
}

  // 4. Send the Request
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:',error);
  }
}

//curl for this api route on localhost
// curl -X POST http://localhost:3000/api/webhook -H "Content-Type: application/json" -d '{"phone":"254745050238"}'

