function queryUserInfo() {
  return {
    userName: 'user',
    userRole: 'admin'
  }
}
export function getUserInfo() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(queryUserInfo())
    }, 1000)
  })
}
