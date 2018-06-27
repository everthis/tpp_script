import camelToSnake from './camelToSnake'
import routePath from '../../../json/routePath.json'
const config = routePath

config.forEach(el => {
  el.path = el.path == null ? `/${camelToSnake(el.component)}` : el.path
})

export default config
