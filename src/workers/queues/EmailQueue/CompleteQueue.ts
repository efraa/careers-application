import { CandidateMessages } from '../../../app/utils/messages/CandidateMessages'
import { emailService } from '../../services/EmailService'
import { formatDate } from '../../utils'

interface IData {
  email: string
  pass: string
  name: string
  queue: any
}

export const completeQueue = async ({ email, pass, name, queue }: IData) =>
  await emailService({
    auth: {
      user: email,
      pass,
    },
    message: {
      from: `${name} <${email}>`,
      to: email,
      subject: CandidateMessages.QUEUES_COMPLETE.replace(/{ID}|{DATE}/gi, m =>
        m === '{ID}' ? queue.id : formatDate(queue.createAt)
      ),
    },
    template: 'queue',
    data: {
      id: queue.id,
      name,
      date: formatDate(queue.createAt),
    },
  })
