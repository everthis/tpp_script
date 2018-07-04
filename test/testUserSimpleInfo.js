const headlessLogin = require('./headlessLogin')
const userSimpleInfo = require('./userSimpleInfo')

headlessLogin()
  .then(([s]) => userSimpleInfo(s))
  .then(d => console.log(d))
