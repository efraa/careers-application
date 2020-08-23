import { Repository, getRepository } from 'typeorm'
import { Queue } from '../../database/entities/Queue'
export class QueueRepository {
  private repo: Repository<Queue>
  private fields = [
    'queue.id',
    'queue.createAt',
    'emails.id',
    'emails.subject',
    'emails.to',
  ]

  constructor() {
    this.repo = getRepository(Queue)
  }

  create = async (payload: any) => this.repo.create(payload as Queue)

  save = async (queue: Queue) => this.repo.save(queue)

  getById = async (id: number, candidateId: number) =>
    this.repo
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue.emails', 'emails')
      .where('queue.id = :id and queue.candidateId = :candidateId', {
        id,
        candidateId,
      })
      .select(this.fields)
      .getOne()

  collection = async (query: {
    page: number
    perPage: number
    candidateId: number
  }) => {
    const { perPage, page, candidateId } = query
    const [rows, count] = await this.repo.findAndCount({
      where: { candidateId },
      skip: perPage * page - perPage,
      take: perPage,
      cache: true,
    })

    return {
      rows,
      total: count,
      pages: Math.ceil(count / perPage),
    }
  }
}
