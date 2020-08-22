import { config } from '../../config'
import { Recruiter } from '../../database/entities/Recruiter'
import { RecruiterMapper } from '../domain/mappers/RecruiterMapper'
import { RecruiterRepository } from '../repositories/RecruiterRepository'
import { RecruiterDTO } from '../domain/dtos/RecruiterDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { RecruiterMessages } from '../utils/messages/RecruiterMessages'

export class RecruiterService {
  constructor(
    private _recruiterRepository: RecruiterRepository,
    private _recruiterMapper: RecruiterMapper
  ) {}

  mapToEntity = async (payload: any): Promise<Recruiter> =>
    this._recruiterMapper.mapToEntity(payload)

  getById = async (id: number) => this._recruiterRepository.getById(id)

  getByEmail = async (email: string) =>
    this._recruiterRepository.getByEmail(email)

  create = async (entity: Recruiter): Promise<RecruiterDTO> =>
    this._recruiterRepository
      .save(entity)
      .then(recruiter => this._recruiterMapper.mapToDTO(recruiter))

  collection = async (query: { page?: number; perPage?: number }) => {
    const { page, perPage } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
    }
    const { rows, total, pages } = await this._recruiterRepository.collection(
      options
    )

    if (!rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        RecruiterMessages.NOT_FOUND
      )

    return {
      data: this._recruiterMapper.mapListToDTO(rows),
      meta: {
        total,
        pages,
        nextPage:
          options.page >= pages ? false : parseInt(options.page as any) + 1,
      },
    }
  }
}
