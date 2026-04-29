import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ── Fix #2: No hardcoded credential fallbacks — rely on Vercel env vars only ─
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS; // Fix #1: set without spaces in Vercel dashboard

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.error('Missing GMAIL_USER or GMAIL_PASS environment variables.');
    return res.status(500).json({ error: 'Server email configuration is missing.' });
  }

  const { from_name, from_email, company, interest, message } = req.body;

  // ── Fix #6: Input validation — prevents crash on undefined fields ─────────
  if (!from_name || !from_email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' });
  }

  const phone = req.body.phone || 'N/A';

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Inquiry: ${from_name}" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: from_email,
    subject: `New Inquiry: ${interest || 'General'} - from ${from_name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #6366f1;">New Inquiry from Showcasing Platform</h2>
        <p><strong>Name:</strong> ${from_name}</p>
        <p><strong>Email:</strong> ${from_email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Area of Interest:</strong> ${interest || 'N/A'}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; line-height: 1.6;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Vercel Function Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
}
