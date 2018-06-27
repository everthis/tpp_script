const semver = require('semver')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { parse, stringify } = JSON
const { promisify } = require('util')
const { exec } = require('child_process')
const { log } = console
const versionReg = /v(.+)/
const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json')
const packageJsonContent = parse(fs.readFileSync(packageJsonPath, 'utf8'))
const nodeRange = packageJsonContent.engines.node
function cExec(cmd) {
  return new Promise(function(resolve, reject) {
    exec(cmd, { maxBuffer: 1024 * 1024 }, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

cExec('node -v').then(d => {
  try {
    const obj = versionReg.exec(d)
    const currentNodeVer = obj[1]
    if (semver.satisfies(currentNodeVer, nodeRange)) {
      log(chalk.green(`Nodejs version check --- pass.`))
    } else {
      log(
        chalk.red(
          `Not using satisfied node: current is ${currentNodeVer}, target is ${nodeRange}`
        )
      )
      process.exit(1)
    }
  } catch (err) {
    log(chalk.red(err))
  }
})
