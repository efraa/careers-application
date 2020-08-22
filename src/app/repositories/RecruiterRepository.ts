import { Repository, getRepository } from 'typeorm'
import { Recruiter } from '../../database/entities/Recruiter'
export class RecruiterRepository {
  private repo: Repository<Recruiter>

  constructor() {
    this.repo = getRepository(Recruiter)
  }

  create = async (payload: any) => this.repo.create(payload as Recruiter)

  save = async (recruiter: Recruiter) => this.repo.save(recruiter)

  getById = async (id: number) => this.repo.findOne({ id })

  getByEmail = async (email: string) => this.repo.findOne({ email })

  collection = async (query: { page: number; perPage: number }) => {
    const { perPage, page } = query
    const [rows, count] = await this.repo.findAndCount({
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
