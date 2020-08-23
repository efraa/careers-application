import { CandidateService } from '../services/CandidateService'
import { ErrorHandler, statusCodes } from '../../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'
import { QueueService } from '../services/QueueService'
import { Worker } from '../../workers'

export class CandidateController {
  constructor(
    private _candidateService: CandidateService,
    private _queueService: QueueService
  ) {}

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

  subscribe = async (candidateId: number, recruiterId: number) => {
    const subscribed = await this._candidateService.subscribe(
      candidateId,
      recruiterId
    )

    if (!subscribed)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        CandidateMessages.SUBSCRIBE_FAIL
      )

    return subscribed
  }

  unsubscribe = async (candidateId: number, recruiterId: number) => {
    const unsubscribed = await this._candidateService.unsubscribe(
      candidateId,
      recruiterId
    )

    if (!unsubscribed)
      throw ErrorHandler.build(
        statusCodes.BAD_REQUEST,
        CandidateMessages.UNSUBSCRIBE_FAIL
      )

    return unsubscribed
  }

  recruiters = async (candidateId: number) => {
    const collection = await this._candidateService.recruiters(candidateId)

    if (!collection)
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.NOT_FOUND
      )

    return collection
  }

  createQueue = async (candidateId: number) => {
    const candidateRecruiters = await this._candidateService.recruiters(
      candidateId
    )
    if (!candidateRecruiters)
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.NOT_FOUND
      )

    const queue = await this._queueService
      .mapToEntity({ candidateId })
      .then(async queue => this._queueService.create(queue))

    if (queue) {
      await Worker.EmailQueue.add({
        queue,
        candidateRecruiters,
      })
    }

    return queue
  }
}
