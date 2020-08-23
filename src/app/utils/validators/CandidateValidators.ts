import { check } from 'express-validator'
import { CandidateMessages } from '../messages/CandidateMessages'
import { commonValidators } from './CommonValidators'

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
  ...commonValidators,
  ...common,
  check('pass', VALIDATOR.DEFAULT).isLength({
    min: 4,
  }),
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
  check('pass', VALIDATOR.DEFAULT).isLength({
    min: 4,
  }),
]

const subscribe = [
  check('recruiterId', VALIDATOR.DEFAULT)
    .isLength({
      min: 1,
    })
    .toInt(),
]

export const validators = { create, update, subscribe }
