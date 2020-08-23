import * as listOfQueues from './queues'

const queues = Object.values(listOfQueues).map(job => job)
const process = () => queues.forEach(queue => queue.process())

export const Worker = {
  queues,
  ...listOfQueues,
  process,
}
