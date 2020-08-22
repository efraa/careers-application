import { check } from 'express-validator'
import { CandidateMessages } from '../messages/CandidateMessages'

const { VALIDATOR } = CandidateMessages

export const commonValidators = [
  check('name', VALIDATOR.DEFAULT).isLength({
    min: 2,
  }),
  check('email', VALIDATOR.EMAIL)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
]
