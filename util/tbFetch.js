const fetch = require('node-fetch')
const querystring = require('querystring')

function tbFetch({ cookie, url, qsObj }) {
  return fetch(`${url}?${querystring.stringify(qsObj)}`, {
    headers: {
      cookie
    }
  }).then(r => r.json())
}

module.exports = tbFetch
