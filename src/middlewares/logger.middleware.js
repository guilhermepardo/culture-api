class Middleware {

  async logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
  }

}

module.exports = Middleware;
