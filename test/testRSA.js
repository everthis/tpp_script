const rsa = require('./tb/encryptPwd').RSAKey

const jm =
  '98639b48645bdaadc930c1e2316b9d07223f3808e9192788a1e2183ff5a33f393ff51f9a6f65050600f4e77890c333c18ff2d5ca9e2259a1696aa4398c7ca809034911671ef06e760a12da4aa285fcd028edaa5e8e3a70d1fed92649ee7189ef0bec70ffa8e26ce57ede52d5593bc36c48abe16c50cc1fd7c1479e53cb0cde99'

const je = '10001'

const ins = new rsa()
const pwd = '134251'
ins.setPublic(jm, je)
const epwd = ins.encrypt(pwd)
console.log(epwd)
