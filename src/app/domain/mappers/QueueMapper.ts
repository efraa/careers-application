import { Mapper } from 'ts-simple-automapper'
import { Queue } from '../../../database/entities/Queue'
import { QueueRepository } from '../../repositories/QueueRepository'
import { QueueDTO } from '../dtos/QueueDTO'

export class QueueMapper {
  private mapper = new Mapper()

  constructor(private _queueRepository: QueueRepository) {}

  mapToDTO = (from: Queue): QueueDTO => this.mapper.map(from, new QueueDTO())

  mapToEntity = async (from: any): Promise<Queue> =>
    this._queueRepository.create(from)

  mapListToDTO = (queues: Queue[]): QueueDTO[] =>
    this.mapper.mapList(queues, QueueDTO)
}
