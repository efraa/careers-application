import { RecruiterRepository } from '../repositories/RecruiterRepository'
import { RecruiterMapper } from '../domain/mappers/RecruiterMapper'
import { RecruiterService } from '../services/RecruiterService'
import { RecruiterController } from '../controllers/RecruiterController'

export class RecruiterModule {
  private _repository: RecruiterRepository
  private _mapper: RecruiterMapper
  private _service: RecruiterService
  private _controller: RecruiterController

  get repository(): RecruiterRepository {
    return !this._repository
      ? (this._repository = new RecruiterRepository())
      : this._repository
  }

  get mapper(): RecruiterMapper {
    return !this._mapper
      ? (this._mapper = new RecruiterMapper(this.repository))
      : this._mapper
  }

  get service(): RecruiterService {
    return !this._service
      ? (this._service = new RecruiterService(this.repository, this.mapper))
      : this._service
  }

  get controller(): RecruiterController {
    return !this._controller
      ? (this._controller = new RecruiterController(this.service))
      : this._controller
  }
}

export const recruiterModule = new RecruiterModule()
