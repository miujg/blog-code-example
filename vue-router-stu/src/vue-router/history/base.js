export default class History {
  constructor (router) {
    this.router = router
  }

  transitionTo(path, cb) {
    console.log(path)
    cb && cb()
  }
}