import asyncHandler from 'express-async-handler'

import { emailClient, sender } from '../config/email.config.js'

const sendWelcomeEmail = asyncHandler(async (email, name) => {
  const recipient = [{ email }]
  try {
    const response = await emailClient.send({
      from: sender,
      to: recipient,
      subject: 'Welcome to the OKlife',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
          <title>Welcome to the OKlife</title>
        </head>
        <body style="font-family: Quicksand, sans-serif; line-height: 1; color: #000a14; max-width: 600px; margin: 0 auto; padding: 16px;">
          <div style="background-color: #0466c8; padding: 16px; text-align: center;">
            <h1 style="color: #fafafa; margin: 0;">Welcome to the OKlife</h1>
          </div>
          <div style="background-color: #rgb(0, 0, 0, 0.16); padding: 16px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Hello, ${name}</p>
            <p style="font-family: Quicksand, sans-serif; color: #fafafa;">Welcome to the OKlife, a journey towards a better future!</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #7a7a7a; font-size: 0.8em;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `,
      category: 'Welcome Email',
    })
  } catch (error) {
    throw new Error(error)
  }
})

export default sendWelcomeEmail
