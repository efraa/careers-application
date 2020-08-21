import { Logger } from '../../helpers/Logger'
// import sgMail from '@sendgrid/mail'
import handlebars from 'handlebars'
import fs from 'fs'

class EmailService {
  constructor() {
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
  }

  public async build(
    email: {
      to: string
      subject: string
      template: string
    },
    data: any
  ) {
    try {
      const { to, subject, template } = email
      const templateFile = fs.readFileSync(
        `templates/${template}.html`,
        'utf-8'
      )
      const html = handlebars.compile(templateFile)(data)

      // return await sgMail.send({
      //   from: process.env.EMAIL_FROM as string,
      //   to,
      //   subject,
      //   html,
      // })

      return {}
    } catch (err) {
      Logger.error(`[EMAIL SERVICE]: ${err.mesagge}`)
    }
  }
}

export default new EmailService()
