const headlessLogin = require('./headlessLogin')
const tppUserSimple = require('./tppUserSimple')

headlessLogin()
  .then(tppUserSimple)
  .then(d => console.log(d))
