import asyncHandler from 'express-async-handler'

import { emailClient, sender } from '../config/email.config.js'

const sendPasswordResetEmail = asyncHandler(async (email) => {
  const recipient = [{ email }]
  try {
    const respone = await emailClient.send({
      from: sender,
      to: recipient,
      subject: 'Password Reset Successful!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
          <title>Password Reset Successful</title>
        </head>
        <body style="font-family: Quicksand, sans-serif; line-height: 1.42; color: #000a14; max-width: 600px; margin: 0 auto; padding: 16px;">
          <div style="background-color: #0466c8; padding: 16px; text-align: center;">
            <h1 style="color: #fafafa; margin: 0;">Password Reset Successful</h1>
          </div>
          <div style="background-color: #rgb(0, 0, 0, 0.16); padding: 16px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);">
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>Hello,</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>We're writing to confirm that your password has been successfully reset.</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #6aaa31; color: #fafafa; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
                ✓
              </div>
            </div>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>If you did not initiate this password reset, please contact our support team immediately.</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>For security reasons, we recommend that you:</p>
            <ul>
              <li style="font-family: Quicksand, sans-serif; color: #fafafa;>Use a strong, unique password</li>
              <li style="font-family: Quicksand, sans-serif; color: #fafafa;>Enable two-factor authentication if available</li>
              <li style="font-family: Quicksand, sans-serif; color: #fafafa;>Avoid using the same password across multiple sites</li>
            </ul>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>Thank you for helping us keep your account secure.</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;>Best regards,<br>Your App Team</p>
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

export default sendPasswordResetEmail
