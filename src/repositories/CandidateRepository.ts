import { Repository, getRepository } from 'typeorm'
import { Candidate } from '../database/entities/Candidate'

export class CandidateRepository {
  private repo: Repository<Candidate>

  constructor() {
    this.repo = getRepository(Candidate)
  }
}
