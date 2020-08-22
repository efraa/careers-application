import { Repository, getRepository } from 'typeorm'
import { Candidate } from '../database/entities/Candidate'
export class CandidateRepository {
  private repo: Repository<Candidate>

  constructor() {
    this.repo = getRepository(Candidate)
  }

  create = async (payload: any) => this.repo.create(payload as Candidate)

  save = async (candidate: Candidate) => this.repo.save(candidate)

  getByEmail = async (email: string) => this.repo.findOne({ email })

  getById = async (id: number) => this.repo.findOne({ id })

  update = async (candidate: Candidate, data: any) =>
    this.save(this.repo.merge(candidate, data))

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
