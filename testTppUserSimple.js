const headlessLogin = require('./headlessLogin')
const tppUserSimple = require('./tppUserSimple')

headlessLogin()
  .then(([s]) => tppUserSimple(s))
  .then(d => console.log(d))
