const headlessLogin = require('./headlessLogin')
const getAllRegion = require('./getAllRegion')

headlessLogin()
  .then(([s]) => getAllRegion(s))
  .then(d => console.log(d))
