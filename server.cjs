const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SMTP Config (direct from your provided credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'marketbusinessofall@gmail.com',
    pass: 'ilqu xofv bqsx uacs', // Gmail App Password
  },
});

app.post('/api/contact', async (req, res) => {
  const { from_name, from_email, company, interest, message } = req.body;

  const mailOptions = {
    from: `"Inquiry: ${from_name}" <marketbusinessofall@gmail.com>`,
    to: 'marketbusinessofall@gmail.com',
    replyTo: from_email,
    subject: `New Inquiry: ${interest} - from ${from_name}`,
    html: `
      <h3>New Inquiry from Showcasing Platform</h3>
      <p><strong>Name:</strong> ${from_name}</p>
      <p><strong>Email:</strong> ${from_email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Area of Interest:</strong> ${interest}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
        ${message.replace(/\n/g, '<br/>')}
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email Relay Backend running on port ${PORT}`);
});
