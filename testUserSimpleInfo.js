const headlessLogin = require('./headlessLogin')
const userSimpleInfo = require('./userSimpleInfo')

headlessLogin()
  .then(userSimpleInfo)
  .then(d => console.log(d))
