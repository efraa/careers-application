import { Mapper } from 'ts-simple-automapper'
import { Recruiter } from '../../../database/entities/Recruiter'
import { RecruiterRepository } from '../../repositories/RecruiterRepository'
import { RecruiterDTO } from '../dtos/RecruiterDTO'

export class RecruiterMapper {
  private mapper = new Mapper()

  constructor(private _recruiterRepository: RecruiterRepository) {}

  mapToDTO = (from: Recruiter): RecruiterDTO =>
    this.mapper.map(from, new RecruiterDTO())

  mapToEntity = async (from: any): Promise<Recruiter> =>
    this._recruiterRepository.create(from)

  mapListToDTO = (recruiters: Recruiter[]): RecruiterDTO[] =>
    this.mapper.mapList(recruiters, RecruiterDTO)
}
