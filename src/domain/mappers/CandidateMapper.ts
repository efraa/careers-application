import { Mapper } from 'ts-simple-automapper'
import { Candidate } from '../../database/entities/Candidate'
import { CandidateRepository } from '../../repositories/CandidateRepository'
import { CandidateDTO } from '../dtos/CandidateDTO'

export class CandidateMapper {
  private mapper = new Mapper()

  constructor(private _candidateRepository: CandidateRepository) {}

  mapToDTO = (from: Candidate): CandidateDTO =>
    this.mapper.map(from, new CandidateDTO())

  mapToEntity = async (from: any): Promise<Candidate> =>
    this._candidateRepository.create(from)

  mapListToDTO = (candidates: Candidate[]): CandidateDTO[] =>
    this.mapper.mapList(candidates, CandidateDTO)
}
