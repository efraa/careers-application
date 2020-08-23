import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { lowercase, encode } from '../transformers'
import { BaseEntity } from '../BaseEntity'

// Relations
import { Queue } from './Queue'
import { Recruiter } from './Recruiter'

@Entity({ name: 'candidates' })
export class Candidate extends BaseEntity {
  @Column()
  name: string

  @Column({
    unique: true,
    transformer: [lowercase, encode],
  })
  email: string

  @Column()
  pass: string

  @Column({
    type: 'simple-json',
  })
  attachment: {
    path: string
    id: string
  }

  @Column({
    transformer: [lowercase],
    nullable: true,
  })
  position: string

  @Column({
    nullable: true,
  })
  message: string

  @Column()
  subject: string

  @OneToMany(() => Queue, q => q.candidateId, {
    onDelete: 'SET NULL',
  })
  queues: Queue[]

  @ManyToMany(() => Recruiter)
  @JoinTable({ name: 'candidate_recruiters_joins' })
  recruiters: Recruiter[]
}
