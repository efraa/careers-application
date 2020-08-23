import { MapProp } from 'ts-simple-automapper'

export class QueueDTO {
  @MapProp()
  id: number

  @MapProp()
  createAt: Date

  @MapProp()
  emails: []
}
