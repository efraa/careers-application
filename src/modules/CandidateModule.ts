import { CandidateRepository } from '../repositories/CandidateRepository'
import { CandidateMapper } from '../domain/mappers/CandidateMapper'
import { CandidateService } from '../services/CandidateService'
import { CandidateController } from '../controllers/CandidateController'

export class CandidateModule {
  private _repository: CandidateRepository
  private _mapper: CandidateMapper
  private _service: CandidateService
  private _controller: CandidateController

  get repository(): CandidateRepository {
    return !this._repository
      ? (this._repository = new CandidateRepository())
      : this._repository
  }

  get mapper(): CandidateMapper {
    return !this._mapper
      ? (this._mapper = new CandidateMapper(this.repository))
      : this._mapper
  }

  get service(): CandidateService {
    return !this._service
      ? (this._service = new CandidateService(
          this.repository,
          this.mapper,
        ))
      : this._service
  }

  get controller(): CandidateController {
    return !this._controller
      ? (this._controller = new CandidateController(this.service))
      : this._controller
  }
}

export const candidateModule = new CandidateModule()
