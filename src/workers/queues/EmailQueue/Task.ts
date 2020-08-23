import { emailService } from '../../services/EmailService'
import { DatabaseConnection } from '../../../database/DatabaseConnection'
import { emailModule } from '../../../app/modules/EmailModule'
import { completeQueue } from './CompleteQueue'
import { buildMessage } from './BuildMessage'

export const EmailTask = {
  key: 'EMAIL_QUEUE',
  handle: async ({ data: { queue, candidateRecruiters } }) =>
    DatabaseConnection.connect().then(async () => {
      const {
        recruiters,
        name,
        email,
        position,
        pass,
        subject,
        message,
        attachment: { path },
      } = candidateRecruiters

      if (recruiters[0]) {
        const results: Promise<void>[] = recruiters.map(async recruiter => {
          const mail = buildMessage({
            subject,
            name,
            path,
            email,
            to: recruiter.email,
          })

          const sendEmail = await emailService({
            auth: {
              user: email,
              pass,
            },
            message: mail,
            template: 'candidate',
            data: {
              name,
              position,
              message,
              recruiterName: recruiter.name,
            },
          })
          if (sendEmail) {
            await emailModule.service
              .mapToEntity({
                subject,
                message,
                queueId: queue.id,
                to: {
                  name: recruiter.name,
                  email: mail.to,
                },
              })
              .then(async email => emailModule.service.create(email))
          }
        })

        Promise.all(results).then(async () =>
          completeQueue({ email, pass, name, queue })
        )
      }
    }),
}
