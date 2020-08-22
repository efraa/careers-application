const candidates = {
  resource: '/candidates',
  collection: '/',
  queues: '/:candidateId/queues',
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
