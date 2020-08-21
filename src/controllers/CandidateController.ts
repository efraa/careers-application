import { CandidateService } from '../services/CandidateService'
import { ErrorHandler, statusCodes } from '../http'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class CandidateController {
  constructor(private _candidateService: CandidateService) {}
}
