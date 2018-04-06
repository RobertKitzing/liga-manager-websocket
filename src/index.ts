import WebsocketServer from './WebsocketServer'

const port = 9898

WebsocketServer.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})