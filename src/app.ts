import 'reflect-metadata'
import { config } from './config'
import { DatabaseConnection } from './database/DatabaseConnection'
import cors from 'cors'
import express, { Application } from 'express'
import compression from 'compression'
import { Routes } from './http'
import morgan from 'morgan'

import { Worker } from './workers'
import BullBoard from 'bull-board'
BullBoard.setQueues(Worker.queues.map(job => job.queue))

const app: Application = express()

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set('port', config.SERVER.PORT)
app.use('/bull-board', BullBoard.UI)
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(cors())

const initializeApplication = async () => {
  try {
    await DatabaseConnection.connect().then(({ options: { database } }) =>
      console.info(`Connected to ${database} database`)
    )

    Routes.build()
    app.use(config.SERVER.PREFIX_ROUTES, Routes.router)
    Worker.process()
  } catch (e) {
    console.error(e)
  }
}

export { app, initializeApplication }
