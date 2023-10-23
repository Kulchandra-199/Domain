const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a Nodemailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
    host: 'weberse.in',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'info@weberse.live', // Your email username
        pass: 'Pp@7884294', // Your email password
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// API endpoint for sending emails
app.post('/send-email', async (req, res) => {
    const { name, email, offer } = req.body;

    try {
        // Send mail with the defined transport object
        const info = await transporter.sendMail({
            from: `"Website Visitor" <${email}>`, // sender's email address
            to: 'kulchandrakandel@gmail.com', // Your email address
            subject: 'New Offer from Website Visitor',
            text: `Name: ${name}\nEmail: ${email}\nOffer: $${offer}`,
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Offer: $${offer}</p>`,
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
