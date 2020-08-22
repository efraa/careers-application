import { RecruiterService } from '../services/RecruiterService'
import { ErrorHandler, statusCodes } from '../../http'
import { RecruiterMessages } from '../utils/messages/RecruiterMessages'

export class RecruiterController {
  constructor(private _recruiterService: RecruiterService) {}

  checkEmail = async (email: string) => {
    const emailExists = await this._recruiterService.getByEmail(email)

    if (emailExists)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        RecruiterMessages.EMAIL_EXISTS
      )
  }

  create = async (payload: any) => {
    await this.checkEmail(payload.email)

    return this._recruiterService
      .mapToEntity(payload)
      .then(async recruiter => this._recruiterService.create(recruiter))
  }

  collection = async (query: { page?: number; perPage?: number }) =>
    this._recruiterService.collection(query)
}
