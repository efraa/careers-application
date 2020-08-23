import { MapProp } from 'ts-simple-automapper'

export class EmailDTO {
  @MapProp()
  id: number

  @MapProp()
  subject: string

  @MapProp()
  message: string

  @MapProp()
  to: {
    name: string
    email: string
  }
}
