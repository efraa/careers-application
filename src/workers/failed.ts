import { Logger } from '../helpers/Logger'

export const Failed = (props: { jobKey: string; err: string }) =>
  Logger.error(`[JOB FAILED]: ${props.jobKey} | ${props.err}`)
