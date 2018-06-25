const headlessLogin = require('./headlessLogin')
const getAllRegion = require('./getAllRegion')

headlessLogin()
  .then(getAllRegion)
  .then(d => console.log(d))
