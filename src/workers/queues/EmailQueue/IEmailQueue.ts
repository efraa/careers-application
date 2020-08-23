import { QueueDTO } from '../../../app/domain/dtos/QueueDTO'

export interface IEmailQueue {
  queue: QueueDTO
  candidateRecruiters: {
    id: number
    recruiters: {
      id: number
      name: string
      email: string
    }[]
  }
}

// export interface IEmailQueue {
//   to: string
//   subject: string
//   template: string
//   data?: any
//   attachments: {
//     filename: string
//     path: string
//   }[]
// }
