import { config } from '../../config'
import { Queue } from '../../database/entities/Queue'
import { QueueMapper } from '../domain/mappers/QueueMapper'
import { QueueRepository } from '../repositories/QueueRepository'
import { QueueDTO } from '../domain/dtos/QueueDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class QueueService {
  constructor(
    private _queueRepository: QueueRepository,
    private _queueMapper: QueueMapper
  ) {}

  mapToEntity = async (payload: any): Promise<Queue> =>
    this._queueMapper.mapToEntity(payload)

  getById = async (id: number, candidateId: number) =>
    this._queueRepository
      .getById(id, candidateId)
      .then(queue => (queue ? this._queueMapper.mapToDTO(queue) : null))

  create = async (entity: Queue): Promise<QueueDTO> =>
    this._queueRepository
      .save(entity)
      .then(queue => this._queueMapper.mapToDTO(queue))

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
    const { rows, total, pages } = await this._queueRepository.collection(
      options
    )

    if (!rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.QUEUES_NOT_FOUND
      )

    return {
      data: this._queueMapper.mapListToDTO(rows),
      meta: {
        total,
        pages,
        nextPage:
          options.page >= pages ? false : parseInt(options.page as any) + 1,
      },
    }
  }
}
