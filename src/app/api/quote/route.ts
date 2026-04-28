import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_QUOTE, // 1Q5Skd3l...RA
      range: 'Sheet1!A2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('en-IN'), // A
          data.name,          // B
          data.phone,         // C
          data.email,         // D
          data.city,          // E
          data.propertyType,  // F
          data.product,       // G
          data.glass,         // H
          data.frameColor,    // I
          `${data.width}x${data.height}`, // J
          data.areaSqFt,      // K
          data.quantity,      // L
          data.pricePerUnit,  // M
          data.totalEstimate, // N
          data.timeline,      // O
          data.notes          // P
        ]],
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}