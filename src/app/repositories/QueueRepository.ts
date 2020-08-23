import { Repository, getRepository } from 'typeorm'
import { Queue } from '../../database/entities/Queue'
export class QueueRepository {
  private repo: Repository<Queue>

  constructor() {
    this.repo = getRepository(Queue)
  }

  create = async (payload: any) => this.repo.create(payload as Queue)

  save = async (queue: Queue) => this.repo.save(queue)

  getById = async (id: number) => this.repo.findOne({ id })

  collection = async (query: {
    page: number
    perPage: number
    candidateId: number
  }) => {
    const { perPage, page, candidateId } = query
    const [rows, count] = await this.repo.findAndCount({
      where: { id: candidateId },
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
