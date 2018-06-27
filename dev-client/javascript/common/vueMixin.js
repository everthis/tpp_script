import cfetch from './cfetch'
// import faye from 'faye'

// const client = new faye.Client('http://10.95.117.40:8077/ws/t')
// client.bind('transport:down', function() {
//   console.log('[CONNECTION DOWN]')
// })
// client.bind('transport:up', function() {
//   console.log('[CONNECTION UP]')
// })
export default function vueMixin(vue) {
  return {
    methods: {
      //   fayeClient() {
      //     return client
      //   },
      cfetch
    }
  }
}
