import { Router } from 'express'
import { BaseRoutes } from './BaseRoutes'

// Modules
import { candidateModule } from '../app/modules/CandidateModule'

// Routes
import { Endpoints } from '../app/routes/Endpoints'
import { CandidateRoutes } from '../app/routes/CandidateRoutes'

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
  }
}
