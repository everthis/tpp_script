const fetch = require('node-fetch')
const { log } = console
const { USER_AGENT } = require('./util/constant')
fetch('https://www.baidu.com', {
  headers: {
    'user-agent': USER_AGENT
  }
}).then(r => {
  // console.log(r.headers.entries())
  for (var pair of r.headers.entries()) {
    console.log(pair[0] + ': ' + pair[1])
  }
  return r.text()
})
// .then(log)
