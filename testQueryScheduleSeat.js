const headlessLogin = require('./headlessLogin')
const queryScheduleSeat = require('./queryScheduleSeat')

headlessLogin()
  .then(s => queryScheduleSeat(s, '535813455'))
  .then(d => console.log(d))
