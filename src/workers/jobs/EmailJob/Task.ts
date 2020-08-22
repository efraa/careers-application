import { emailService } from '../../services/EmailService'

export const EmailTask = {
  key: 'SEND_EMAIL_JOB',
  async handle({ data: { email } }) {
    await emailService.build(
      {
        to: email.to,
        subject: email.subject,
        template: email.template,
      },
      email.data
    )
  },
}
