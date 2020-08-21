import { check, param } from 'express-validator'
import { CandidateMessages } from '../messages/CandidateMessages'

const { VALIDATOR } = CandidateMessages

const create = [
  check('content', VALIDATOR.CONTENT).isLength({
    min: 2,
  }),
]

export const validators = { create }
