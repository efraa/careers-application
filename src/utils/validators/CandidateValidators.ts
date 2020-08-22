import { check } from 'express-validator'
import { CandidateMessages } from '../messages/CandidateMessages'

const { VALIDATOR } = CandidateMessages

const common = [
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

const create = [
  ...common,
  check('name', VALIDATOR.DEFAULT).isLength({
    min: 2,
  }),
  check('email', VALIDATOR.EMAIL)
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
]

const update = [
  ...common,
  check('name', VALIDATOR.DEFAULT).optional().isLength({
    min: 2,
  }),
  check('email', VALIDATOR.EMAIL)
    .optional()
    .isEmail()
    .normalizeEmail({ all_lowercase: true }),
]

export const validators = { create, update }
