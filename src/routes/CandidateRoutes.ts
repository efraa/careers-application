import { BaseRoutes } from '../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../http'
import { Response, RequestHandler, Request } from 'express'
import { CandidateController } from '../controllers/CandidateController'
import { validators } from '../utils/validators/CandidateValidators'
import { Endpoints } from './Endpoints'

export class CandidateRoutes extends BaseRoutes {
  constructor(
    modulePath: string,
    private _candidateController: CandidateController
  ) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api.get(Endpoints.candidates.collection, this.create)
    // this.api
    //   .route(Endpoints.candidates.like)
    //   .all([isAuthorized, ...validators.like])
    //   .candidate(this.like)
    //   .delete(this.unlike)
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        return res
          .status(statusCodes.CREATE)
          .send(ResponseHandler.build({ msg: 'Test' }, false))
      },
      req,
      res,
    })
}
