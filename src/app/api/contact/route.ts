import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;

        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error("Missing Google Credentials in Environment Variables");
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID_CONTACT,
            range: 'Sheet1!A:E', // Updated range to accommodate 5 columns
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [name, email, phone, message, new Date().toLocaleString('en-IN')]
                ],
            },
        });

        return NextResponse.json({ message: 'Success!' }, { status: 200 });
    } catch (error: any) {
        console.error('Detailed Google Error:', error.response?.data || error.message);
        
        return NextResponse.json(
            { error: error.message || 'Failed to submit form' }, 
            { status: 500 }
        );
    }
}