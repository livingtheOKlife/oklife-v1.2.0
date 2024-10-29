import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN

const emailClient = new MailtrapClient({
  token: TOKEN,
})

const sender = {
  email: 'hello@demomailtrap.com',
  name: 'Mailtrap Test',
}

export { emailClient, sender }
