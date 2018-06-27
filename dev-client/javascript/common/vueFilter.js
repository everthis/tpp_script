import dateFormatter from './dateFormatter'
export default function vueFilter(vue) {
  vue.filter('dateFormatter', function(value) {
    if (!value) return ''
    value = new Date(value)
    return dateFormatter(value, 'yyyy-MM-dd HH:mm:ss')
  })
}
