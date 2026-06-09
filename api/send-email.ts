import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY environment variable is not set.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Website Contact <noreply@nanorevolution.ro>',
        to: ['contact@nanorevolution.ro'],
        subject: `Mesaj nou de contact de la ${name}`,
        reply_to: email,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; color: #333;">
            <h2 style="color: #FF4500; border-bottom: 2px solid #FF4500; padding-bottom: 10px; margin-top: 0;">Mesaj nou de contact (nanorevolution.ro)</h2>
            <p><strong>Nume:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefon:</strong> ${phone || 'Nespecificat'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #FF4500; line-height: 1.6; color: #555;">${message}</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to send email via Resend' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
