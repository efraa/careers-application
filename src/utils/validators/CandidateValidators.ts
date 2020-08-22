import { check } from 'express-validator'
import { CandidateMessages } from '../messages/CandidateMessages'

const { VALIDATOR } = CandidateMessages

const create = [
  check('name', VALIDATOR.DEFAULT).isLength({
    min: 2,
  }),
  check('email', VALIDATOR.EMAIL)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
  check('position', VALIDATOR.DEFAULT).optional().isLength({
    min: 2,
  }),
  check('message', VALIDATOR.DEFAULT).optional().isLength({
    min: 2,
  }),
  check('subject', VALIDATOR.DEFAULT).optional().isLength({
    min: 2,
  }),
]

export const validators = { create }
