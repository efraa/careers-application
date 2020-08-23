const candidates = {
  resource: '/candidates',
  collection: '/',
  queues: '/:candidateId/queues',
  queue: '/:candidateId/queues/:queueId',
  recruiters: '/:candidateId/recruiters',
  document: '/:candidateId',
}

const recruiters = {
  resource: '/recruiters',
  collection: '/',
}

export const Endpoints = {
  candidates,
  recruiters,
}
