require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

// ── Fix #2: Fail fast if credentials are missing — no hardcoded fallbacks ──────
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error('❌  GMAIL_USER and GMAIL_PASS must be set in environment variables.');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,   // Fix #1: no spaces in the App Password
  },
});

// Optional: verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('⚠️  SMTP connection failed:', error.message);
  } else {
    console.log('✅  SMTP transporter is ready to send emails.');
  }
});

app.post('/api/contact', async (req, res) => {
  const { from_name, from_email, company, interest, message } = req.body;

  // ── Fix #6: Input validation — prevents crash on undefined fields ─────────
  if (!from_name || !from_email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' });
  }

  const phone = req.body.phone || 'N/A';

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
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
});

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve the React app for any unhandled paths (React Router fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
// Explicitly bind to 0.0.0.0 — required by Render (and most cloud hosts).
// Binding to localhost only makes the port invisible to Render's port scanner.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  Email Relay Backend running on port ${PORT} (0.0.0.0)`);
});
