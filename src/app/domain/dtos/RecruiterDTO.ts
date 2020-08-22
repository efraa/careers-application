import { MapProp } from 'ts-simple-automapper'

export class RecruiterDTO {
  @MapProp()
  id: number

  @MapProp()
  name: string

  @MapProp()
  email: string
}
