import { config } from '../config'
import { Candidate } from 'src/database/entities/Candidate'
import { CandidateMapper } from '../domain/mappers/CandidateMapper'
import { CandidateRepository } from '../repositories/CandidateRepository'
import { CandidateDTO } from '../domain/dtos/CandidateDTO'
import { ErrorHandler, statusCodes } from '../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class CandidateService {
  constructor(
    private _candidateRepository: CandidateRepository,
    private _candidateMapper: CandidateMapper,
  ) {}
}
