import { CandidateService } from '../services/CandidateService'
import { ErrorHandler, statusCodes } from '../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class CandidateController {
  constructor(private _candidateService: CandidateService) {}

  checkEmail = async (email: string) => {
    const emailExists = await this._candidateService.getByEmail(email)

    if (emailExists)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        CandidateMessages.EMAIL_EXISTS
      )
  }

  create = async (payload: any, file: { path: string; name: string }) => {
    await this.checkEmail(payload.email)
    const attachment = await this._candidateService.attachment(file)

    return this._candidateService
      .mapToEntity({ ...payload, attachment })
      .then(async candidate => this._candidateService.create(candidate))
  }

  update = async (
    candidateId: number,
    data: any,
    file?: { path: string; name: string }
  ) => {
    if (!Object.keys(data).length)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        CandidateMessages.REQUIRE
      )

    const updates: any = { ...data }
    const candidate = await this._candidateService.getById(candidateId)

    if (!candidate)
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.NOT_FOUND
      )

    if (updates.email && updates.email !== candidate.email)
      await this.checkEmail(updates.email)

    if (file) {
      updates.attachment = await this._candidateService.attachment(
        file,
        candidate.attachment.id
      )
    }

    return this._candidateService.update(candidate, updates)
  }

  collection = async (query: { page?: number; perPage?: number }) =>
    this._candidateService.collection(query)
}
