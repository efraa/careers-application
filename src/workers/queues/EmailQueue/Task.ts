import { emailService } from '../../services/EmailService'
import { DatabaseConnection } from '../../../database/DatabaseConnection'
import { emailModule } from '../../../app/modules/EmailModule'
import { formatDate } from '../../utils'
import { CandidateMessages } from '../../../app/utils/messages/CandidateMessages'

export const EmailTask = {
  key: 'EMAIL_QUEUE',
  handle: async ({ data: { queue, candidateRecruiters } }) =>
    DatabaseConnection.connect().then(async () => {
      if (candidateRecruiters.recruiters[0]) {
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

        const results: Promise<void>[] = recruiters.map(async recruiter => {
          const mail = {
            subject,
            from: `${name} <${email}>`,
            to: recruiter.email,
            attachments: [
              {
                filename: `${name.replace(/ /g, '-')}-curriculum.pdf`,
                path,
              },
            ],
          }

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
              recruiterName: recruiter.name,
              message: candidateRecruiters.message,
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

        Promise.all(results).then(async () => {
          await emailService({
            auth: {
              user: email,
              pass,
            },
            message: {
              from: `${name} <${email}>`,
              to: email,
              subject: CandidateMessages.QUEUES_COMPLETE.replace(
                /{ID}|{DATE}/gi,
                m => (m === '{ID}' ? queue.id : formatDate(queue.createAt))
              ),
            },
            template: 'queue',
            data: {
              id: queue.id,
              name,
              date: formatDate(queue.createAt),
            },
          })
        })
      }
    }),
}
