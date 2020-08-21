import { Mapper } from 'ts-simple-automapper'
import { Candidate } from '../../database/entities/Candidate'
import { CandidateRepository } from '../../repositories/CandidateRepository'
import { CandidateDTO } from '../dtos/CandidateDTO'

export class CandidateMapper {
  constructor(private _candidateRepository: CandidateRepository) {}

  mapToDTO(from: Candidate): CandidateDTO {
    const candidateDTO: CandidateDTO = new Mapper().map(from, new CandidateDTO())
    return candidateDTO
  }

  mapListToDTO = (candidates: Candidate[]): CandidateDTO[] =>
    candidates.map(candidate => this.mapToDTO(candidate))
}
