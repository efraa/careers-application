import { BaseRoutes } from '../../http/BaseRoutes'
import { ResponseHandler, RouteMethod, statusCodes } from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { RecruiterController } from '../controllers/RecruiterController'
import { validators } from '../utils/validators/RecruiterValidators'
import { Endpoints } from './Endpoints'

export class RecruiterRoutes extends BaseRoutes {
  constructor(
    modulePath: string,
    private _recruiterController: RecruiterController
  ) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api
      .route(Endpoints.recruiters.collection)
      .post(validators.create, this.create)
      .get(this.collection)
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._recruiterController
          .create(req.body)
          .then(recruiter =>
            res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(recruiter, false))
          ),
      req,
      res,
    })

  collection: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const collection = await this._recruiterController.collection({
          page: page as any,
          perPage: perPage as any,
        })
        if (collection)
          return res
            .status(statusCodes.OK)
            .send(ResponseHandler.build(collection, false))
      },
      req,
      res,
    })
}
