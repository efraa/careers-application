import { MapProp } from 'ts-simple-automapper'

export class CandidateDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  pass: string

  @MapProp()
  email: string

  @MapProp()
  attachment: {
    path: string
    id: string
  }

  @MapProp()
  position: string

  @MapProp()
  message: string

  @MapProp()
  subject: string

  @MapProp()
  queues: []
}
