import asyncHandler from 'express-async-handler'

import { emailClient, sender } from '../config/email.config.js'

const sendForgotPasswordEmail = asyncHandler(async (email, resetURL) => {
  const recipient = [{ email }]
  try {
    const response = await emailClient.send({
      from: sender,
      to: recipient,
      subject: 'Forgotten Password',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
          <title>Forgotten Password</title>
        </head>
        <body style="font-family: Quicksand, sans-serif; line-height: 1.42; color: #000a14; max-width: 600px; margin: 0 auto; padding: 16px;">
          <div style="background-color: #0466c8; padding: 16px; text-align: center;">
            <h1 style="color: #fafafa; margin: 0;">Forgotten Password</h1>
          </div>
          <div style="background-color: #rgb(0, 0, 0, 0.16); font-family: Quicksand, sans-serif; color: #fafafa; padding: 16px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);">
            <p>Hello,</p>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetURL}" style="background-color: #0466c8; color: #fafafa; padding: 12px 16px; text-decoration: none; border-radius: 5px; font-weight: 600;">Reset Password</a>
            </div>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>Best regards,<br>Your App Team</p>
          </div>
          <div style="text-align: center; margin-top: 16px; color: #7a7a7a; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      category: 'Password Reset',
    })
  } catch (error) {
    throw new Error(error)
  }
})

export default sendForgotPasswordEmail
