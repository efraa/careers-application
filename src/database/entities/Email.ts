import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from '../BaseEntity'
import { lowercase } from '../transformers'

// Relations
import { Queue } from './Queue'

@Entity({ name: 'emails' })
export class Email extends BaseEntity {
  @Column({
    transformer: [lowercase],
  })
  subject: string

  @Column({
    transformer: [lowercase],
  })
  message: string

  @Column({
    nullable: true,
    type: 'simple-json',
  })
  to: {
    name: string
    email: string
  }

  @Column()
  queueId: number

  @ManyToOne(type => Queue, q => q.emails, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  queue: Queue
}
