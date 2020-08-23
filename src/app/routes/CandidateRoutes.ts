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

    this.api
      .route(Endpoints.candidates.recruiters)
      .get(this.recruiters)
      .put(validators.subscribe, this.subscribe)
      .delete(validators.subscribe, this.unsubscribe)

    this.api
      .route(Endpoints.candidates.queues)
      .post(this.createQueue)
      .get(this.queues)
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

  queues: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () => {
        const { page, perPage } = req.query
        const collection = await this._candidateController.queues({
          page: page as any,
          perPage: perPage as any,
          candidateId: parseInt(req.params.candidateId),
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

  subscribe: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._candidateController
          .subscribe(parseInt(req.params.candidateId), req.body.recruiterId)
          .then(subscribed =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(subscribed, false))
          ),
      req,
      res,
    })

  unsubscribe: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._candidateController
          .unsubscribe(parseInt(req.params.candidateId), req.body.recruiterId)
          .then(unsubscribed =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(unsubscribed, false))
          ),
      req,
      res,
    })

  recruiters: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._candidateController
          .recruiters(parseInt(req.params.candidateId))
          .then(recruiters =>
            res
              .status(statusCodes.OK)
              .send(ResponseHandler.build(recruiters, false))
          ),
      req,
      res,
    })

  createQueue: RequestHandler = (req: Request, res: Response) =>
    RouteMethod.build({
      resolve: async () =>
        this._candidateController
          .createQueue(parseInt(req.params.candidateId))
          .then(queue =>
            res.status(statusCodes.OK).send(ResponseHandler.build(queue, false))
          ),
      req,
      res,
    })
}
