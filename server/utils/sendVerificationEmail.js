import asyncHandler from 'express-async-handler'

import { emailClient, sender } from '../config/email.config.js'

const sendVerificationEmail = asyncHandler(async (email, verificationToken) => {
  const recipient = [{ email }]
  try {
    const response = await emailClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Quicksand, sans-serif; line-height: 1.42; color: #000a14; max-width: 600px; margin: 0 auto; padding: 16px;">
          <div style="background-color: #0466c8; padding: 16px; text-align: center;">
            <h1 style="color: #fafafa; margin: 0;">Verify Your Email</h1>
          </div>
          <div style="background-color: #rgb(0, 0, 0, 0.16); padding: 16px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);">
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Hello,</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Thank you for signing up! Your verification code is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #fafafa;">${verificationToken}</span>
            </div>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Enter this code on the verification page to complete your registration.</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">This code will expire in 15 minutes for security reasons.</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">If you didn't create an account with us, please ignore this email.</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Best regards,<br>Your App Team</p>
          </div>
          <div style="text-align: center; margin-top: 16px; color: #7a7a7a; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      category: 'Email Verification',
    })
  } catch (error) {
    throw new Error(error)
  }
})

export default sendVerificationEmail
