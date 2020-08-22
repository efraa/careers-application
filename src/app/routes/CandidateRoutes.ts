import { BaseRoutes } from '../../http/BaseRoutes'
import {
  ErrorHandler,
  ResponseHandler,
  RouteMethod,
  statusCodes,
} from '../../http'
import { Response, RequestHandler, Request } from 'express'
import { CandidateController } from '../controllers/CandidateController'
import { validators } from '../utils/validators/CandidateValidators'
import { Endpoints } from './Endpoints'
import { CandidateAttachment } from '../../middlewares/CandidateAttachment'
import { CandidateMessages } from '../utils/messages/CandidateMessages'

export class CandidateRoutes extends BaseRoutes {
  constructor(
    modulePath: string,
    private _candidateController: CandidateController
  ) {
    super(modulePath)
    this.addRoutes()
  }

  addRoutes() {
    this.api
      .route(Endpoints.candidates.collection)
      .post([CandidateAttachment, ...validators.create], this.create)
      .get(this.collection)

    this.api.put(
      Endpoints.candidates.document,
      [CandidateAttachment, ...validators.update],
      this.update
    )
  }

  create: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        if (!req.file)
          throw ErrorHandler.build(
            statusCodes.BAD_REQUEST,
            CandidateMessages.INVALID_FILE_EXT
          )

        return this._candidateController
          .create(req.body, {
            path: req.file.path,
            name: req.file.filename,
          })
          .then(candidate =>
            res
              .status(statusCodes.CREATE)
              .send(ResponseHandler.build(candidate, false))
          )
      },
      req,
      res,
    })

  collection: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const collection = await this._candidateController.collection({
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

  update: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._candidateController
          .update(
            parseInt(req.params.candidateId as string),
            req.body,
            req?.file
              ? {
                  path: req?.file.path,
                  name: req?.file.filename,
                }
              : undefined
          )
          .then(candidate =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(candidate, false))
          ),
      req,
      res,
    })
}
