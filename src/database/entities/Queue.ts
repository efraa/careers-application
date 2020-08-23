import { Entity, JoinColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../BaseEntity'

// Relations
import { Candidate } from './Candidate'
import { Email } from './Email'

@Entity({ name: 'queues' })
export class Queue extends BaseEntity {
  @Column()
  candidateId: number

  @ManyToOne(() => Candidate, c => c.queues, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  candidate: Candidate

  @OneToMany(() => Email, email => email.queue, {
    onDelete: 'SET NULL',
  })
  emails: Email[]
}
