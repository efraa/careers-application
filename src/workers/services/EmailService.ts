import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'
import fs from 'fs'
import dotenv from 'dotenv'
import { Logger } from '../../helpers/Logger'
import handlebars from 'handlebars'

dotenv.config()

class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async build(
    props: {
      to: string
      subject: string
      template: string
      attachments: {
        filename: string
        path: string
      }[]
    },
    data: any
  ) {
    try {
      const { to, subject, template, attachments } = props
      const templateFile = fs.readFileSync(
        `templates/${template}.html`,
        'utf-8'
      )
      const html = handlebars.compile(templateFile)(data)
      const message: SendMailOptions = {
        from: process.env.MAILER_FROM,
        to,
        subject,
        html,
        attachments,
      }

      return this.transporter.sendMail(message)
    } catch (err) {
      Logger.error(`[EMAIL SERVICE]: ${err.mesagge}`)
    }
  }
}

export const emailService = new EmailService()
