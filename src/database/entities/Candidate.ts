import { Entity, Column, OneToMany } from 'typeorm'
import { lowercase, capitalize, encode } from '../transformers'
import { BaseEntity } from '../BaseEntity'

// Relations
import { Queue } from './Queue'

@Entity({ name: 'candidates' })
export class Candidate extends BaseEntity {
  @Column({
    transformer: [capitalize],
  })
  name: string

  @Column({
    unique: true,
    transformer: [lowercase, encode],
  })
  email: string

  @Column({
    nullable: true,
  })
  attachment: string

  @Column({
    transformer: [capitalize],
    nullable: true,
  })
  position: string

  @Column({
    nullable: true,
  })
  message: string

  @Column({
    nullable: true,
  })
  subject: string

  @OneToMany(type => Queue, q => q.candidateId, {
    onDelete: 'SET NULL',
  })
  queues: Queue[]
}
