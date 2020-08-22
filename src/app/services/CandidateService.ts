import { config } from '../../config'
import { Candidate } from '../../database/entities/Candidate'
import { CandidateMapper } from '../domain/mappers/CandidateMapper'
import { CandidateRepository } from '../repositories/CandidateRepository'
import { CandidateDTO } from '../domain/dtos/CandidateDTO'
import { ErrorHandler, statusCodes } from '../../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'
import { Cloudinary } from '../../helpers/Cloudinary'
import { destroyFiles } from '../../helpers/DestroyFiles'

export class CandidateService {
  constructor(
    private _candidateRepository: CandidateRepository,
    private _candidateMapper: CandidateMapper
  ) {}

  mapToEntity = async (payload: any): Promise<Candidate> =>
    this._candidateMapper.mapToEntity(payload)

  getById = async (id: number) => this._candidateRepository.getById(id)

  getByEmail = async (email: string) =>
    this._candidateRepository.getByEmail(email)

  create = async (entity: Candidate): Promise<CandidateDTO> =>
    this._candidateRepository
      .save(entity)
      .then(candidate => this._candidateMapper.mapToDTO(candidate))

  update = async (candidate: Candidate, data: any) =>
    this._candidateRepository
      .update(candidate, data)
      .then(updates => this._candidateMapper.mapToDTO(updates))

  collection = async (query: { page?: number; perPage?: number }) => {
    const { page, perPage } = query
    const options = {
      page: page || config.PAGINATION.PAGE,
      perPage: perPage || config.PAGINATION.PER_PAGE,
    }
    const { rows, total, pages } = await this._candidateRepository.collection(
      options
    )

    if (!rows[0])
      throw ErrorHandler.build(
        statusCodes.NOT_FOUND,
        CandidateMessages.NOT_FOUND
      )

    return {
      data: this._candidateMapper.mapListToDTO(rows),
      meta: {
        total,
        pages,
        nextPage:
          options.page >= pages ? false : parseInt(options.page as any) + 1,
      },
    }
  }

  async attachment(file: { path: string; name: string }, destroyFile?: string) {
    if (destroyFile) await Cloudinary.destroy(destroyFile)

    const { secure_url: path, public_id: id } = await Cloudinary.upload(
      file.path,
      {
        folder: 'candidates',
      }
    )
    if (id) await destroyFiles(file.name)

    return { id, path }
  }

  recruiters = async (candidateId: number) =>
    this._candidateRepository.recruiters(candidateId)

  subscribe = async (candidateId: number, recruiterId: number) =>
    this._candidateRepository.subscribe(candidateId, recruiterId)

  unsubscribe = async (candidateId: number, recruiterId: number) =>
    this._candidateRepository.unsubscribe(candidateId, recruiterId)
}
