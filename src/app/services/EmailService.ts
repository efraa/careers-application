import { config } from '../../config'
import { Email } from '../../database/entities/Email'
import { EmailMapper } from '../domain/mappers/EmailMapper'
import { EmailRepository } from '../repositories/EmailRepository'
import { EmailDTO } from '../domain/dtos/EmailDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class EmailService {
  constructor(
    private _emailRepository: EmailRepository,
    private _emailMapper: EmailMapper
  ) {}

  mapToEntity = async (payload: any): Promise<Email> =>
    this._emailMapper.mapToEntity(payload)

  create = async (entity: Email): Promise<EmailDTO> =>
    this._emailRepository
      .save(entity)
      .then(email => this._emailMapper.mapToDTO(email))

  collection = async (query: {
    page?: number
    perPage?: number
    candidateId: number
  }) => {
    const { page, perPage, candidateId } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
      candidateId,
    }
    const { rows, total, pages } = await this._emailRepository.collection(
      options
    )

    if (!rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.QUEUES_NOT_FOUND
      )

    return {
      data: this._emailMapper.mapListToDTO(rows),
      meta: {
        total,
        pages,
        nextPage:
          options.page >= pages ? false : parseInt(options.page as any) + 1,
      },
    }
  }
}
