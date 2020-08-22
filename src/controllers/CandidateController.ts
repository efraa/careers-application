import { CandidateService } from '../services/CandidateService'
import { ErrorHandler, statusCodes } from '../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class CandidateController {
  constructor(private _candidateService: CandidateService) {}

  create = async (payload: any, file: { path: string; name: string }) => {
    const emailExists = await this._candidateService.getByEmail(payload.email)

    if (emailExists)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        CandidateMessages.EMAIL_EXISTS
      )

    const attachment = await this._candidateService.attachment(file)

    return this._candidateService
      .mapToEntity({ ...payload, attachment })
      .then(async candidate => this._candidateService.create(candidate))
  }

  collection = async (query: { page?: number; perPage?: number }) =>
    this._candidateService.collection(query)
}
