import camelToSnake from './camelToSnake'
function importComponent(name) {
  return function(resolve) {
    import(`../../component/${name}.vue`).then(mod => {
      resolve(mod)
    })
  }
}
function underscoreToSlash(str) {
  return str.replace(/_/g, '/')
}

export default function genRestRoute(arr) {
  return arr.map(el => {
    const isObj =
      Object.prototype.toString.call(el) === '[object Object]' ? true : false
    return {
      path: `${
        isObj
          ? el.path == null
            ? `/${el.component}`
            : el.path
          : underscoreToSlash(camelToSnake(el))
      }`,
      component: importComponent(isObj ? el.component : el)
    }
  })
}
