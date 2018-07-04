const headlessLogin = require('./headlessLogin')
const lockSeat = require('./lockSeat')

headlessLogin()
  .then(([s]) => lockSeat(s, {}))
  .then(d => console.log(d))
