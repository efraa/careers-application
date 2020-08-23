import { Entity, Column } from 'typeorm'
import { lowercase, encode } from '../transformers'
import { BaseEntity } from '../BaseEntity'

@Entity({ name: 'recruiters' })
export class Recruiter extends BaseEntity {
  @Column()
  name: string

  @Column({
    unique: true,
    transformer: [lowercase, encode],
  })
  email: string
}
