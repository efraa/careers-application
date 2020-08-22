export interface IEmailJob {
  to: string
  subject: string
  template: string
  data?: any
  attachments: {
    filename: string
    path: string
  }[]
}
