import { Repository, getRepository } from 'typeorm'
import { Email } from '../../database/entities/Email'
export class EmailRepository {
  private repo: Repository<Email>

  constructor() {
    this.repo = getRepository(Email)
  }

  create = async (payload: any) => this.repo.create(payload as Email)

  save = async (email: Email) => this.repo.save(email)

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
