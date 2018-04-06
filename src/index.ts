import WebsocketServer from './WebsocketServer'

const port = process.env.PORT || 9898

WebsocketServer.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})