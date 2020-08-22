import { Entity, Column } from 'typeorm'
import { lowercase, capitalize, encode } from '../transformers'
import { BaseEntity } from '../BaseEntity'

@Entity({ name: 'recruiters' })
export class Recruiter extends BaseEntity {
  @Column({
    transformer: [capitalize],
  })
  name: string

  @Column({
    unique: true,
    transformer: [lowercase, encode],
  })
  email: string
}
