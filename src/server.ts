import { app, initializeApplication } from './app'

initializeApplication().then(() => {
  app.listen(app.get('port'), () =>
    console.log('Running on port', app.get('port'))
  )
})
