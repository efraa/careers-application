import Queue, { Queue as IQueue, JobOptions } from 'bull'
import { Failed } from './failed'

export const CreateQueue = (props: {
  name: string
  handle: (data: any) => void
  jobOpts?: JobOptions
}): {
  queue: IQueue
  process: () => void
} => {
  const queue = new Queue(props.name, {
    redis: process.env.REDIS_URI,
    defaultJobOptions: props.jobOpts,
  })

  return {
    queue,
    process: () => {
      queue.process(props.handle)
      queue.on('failed', (job, err) =>
        Failed({ jobKey: job.name, err: err.message })
      )
    },
  }
}
