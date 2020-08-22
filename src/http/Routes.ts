import { Router } from 'express'
import { BaseRoutes } from './BaseRoutes'

// Modules
import { candidateModule } from '../app/modules/CandidateModule'
import { recruiterModule } from '../app/modules/RecruiterModule'

// Routes
import { Endpoints } from '../app/routes/Endpoints'
import { CandidateRoutes } from '../app/routes/CandidateRoutes'
import { RecruiterRoutes } from '../app/routes/RecruiterRoutes'

export class Routes {
  static router: Router = Router()

  static add = (moduleRoutes: BaseRoutes) =>
    Routes.router.use(moduleRoutes.domain, moduleRoutes.routes)

  static build = () => {
    Routes.add(
      new CandidateRoutes(
        Endpoints.candidates.resource,
        candidateModule.controller
      )
    )
    Routes.add(
      new RecruiterRoutes(
        Endpoints.recruiters.resource,
        recruiterModule.controller
      )
    )
  }
}
