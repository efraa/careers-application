import { Entity, JoinColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../BaseEntity'

// Relations
import { Candidate } from './Candidate'
import { Email } from './Email'

@Entity({ name: 'queues' })
export class Queue extends BaseEntity {
  @Column()
  candidateId: number

  @ManyToOne(type => Candidate, c => c.queues, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  candidate: Candidate

  @OneToMany(type => Email, email => email.queueId, {
    onDelete: 'SET NULL',
  })
  emails: Email[]
}
