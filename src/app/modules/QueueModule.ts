import { QueueRepository } from '../repositories/QueueRepository'
import { QueueMapper } from '../domain/mappers/QueueMapper'
import { QueueService } from '../services/QueueService'

export class QueueModule {
  private _repository: QueueRepository
  private _mapper: QueueMapper
  private _service: QueueService

  get repository(): QueueRepository {
    return !this._repository
      ? (this._repository = new QueueRepository())
      : this._repository
  }

  get mapper(): QueueMapper {
    return !this._mapper
      ? (this._mapper = new QueueMapper(this.repository))
      : this._mapper
  }

  get service(): QueueService {
    return !this._service
      ? (this._service = new QueueService(this.repository, this.mapper))
      : this._service
  }
}

export const queueModule = new QueueModule()
