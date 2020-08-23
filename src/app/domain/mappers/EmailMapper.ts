import { Mapper } from 'ts-simple-automapper'
import { Email } from '../../../database/entities/Email'
import { EmailRepository } from '../../repositories/EmailRepository'
import { EmailDTO } from '../dtos/EmailDTO'

export class EmailMapper {
  private mapper = new Mapper()

  constructor(private _emailRepository: EmailRepository) {}

  mapToDTO = (from: Email): EmailDTO => this.mapper.map(from, new EmailDTO())

  mapToEntity = async (from: any): Promise<Email> =>
    this._emailRepository.create(from)

  mapListToDTO = (emails: Email[]): EmailDTO[] =>
    this.mapper.mapList(emails, EmailDTO)
}
