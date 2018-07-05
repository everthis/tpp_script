const noCaptcha = require('./noCaptcha')
async function postProcessRequest(apiResponse, state, cbFn, cbFnPayload) {
  if (apiResponse.data && apiResponse.data.url) {
    return await noCaptcha(apiResponse, state, cbFn, cbFnPayload)
  } else {
    return apiResponse
  }
}

module.exports = postProcessRequest
