import { CreateQueue } from '../../CreateQueue'
import { IEmailQueue } from './IEmailQueue'
import { EmailTask } from './Task'

const queue = CreateQueue({
  name: EmailTask.key,
  handle: EmailTask.handle,
})

export const EmailQueue = {
  ...queue,
  add: (data: IEmailQueue) => queue.queue.add(data),
}
