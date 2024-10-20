import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.get('/', (req, res) => {
    res.render('main');
});

router.post('/send', async (req, res) => {
    const { email, message } = req.body;

    console.log(process.env.MAIL_USER_NAME)
    console.log(process.env.MAIL_PASSWORD)
    // Настройка Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER_NAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER_NAME,
        to: email,
        subject: 'Message',
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Письмо успешно отправлено!');
    } catch (error) {
        console.error('Ошибка при отправке письма:', error);
        res.status(500).send('Произошла ошибка при отправке письма.');
    }
});

export default router;