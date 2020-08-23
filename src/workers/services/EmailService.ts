import nodemailer from 'nodemailer'
import fs from 'fs'
import dotenv from 'dotenv'
import { Logger } from '../../helpers/Logger'
import handlebars from 'handlebars'

dotenv.config()

interface IData {
  auth: {
    user: string
    pass: string
  }
  message: {
    from: string
    to: string
    subject: string
    attachments?: {
      filename: string
      path: string
    }[]
  }
  template: string
  data: any
}

export const emailService = async ({
  auth,
  data,
  message,
  template,
}: IData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth,
    })
    const templateFile = fs.readFileSync(
      `src/templates/${template}.html`,
      'utf-8'
    )
    const html = handlebars.compile(templateFile)(data)

    return transporter.sendMail({ ...message, html })
  } catch (error) {
    Logger.error(`[EMAIL SERVICE]: ${error}`)
  }
}
