import { EmailRepository } from '../repositories/EmailRepository'
import { EmailMapper } from '../domain/mappers/EmailMapper'
import { EmailService } from '../services/EmailService'

export class EmailModule {
  private _repository: EmailRepository
  private _mapper: EmailMapper
  private _service: EmailService

  get repository(): EmailRepository {
    return !this._repository
      ? (this._repository = new EmailRepository())
      : this._repository
  }

  get mapper(): EmailMapper {
    return !this._mapper
      ? (this._mapper = new EmailMapper(this.repository))
      : this._mapper
  }

  get service(): EmailService {
    return !this._service
      ? (this._service = new EmailService(this.repository, this.mapper))
      : this._service
  }
}

export const emailModule = new EmailModule()
