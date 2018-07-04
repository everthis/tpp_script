const notifier = require('node-notifier')
const path = require('path')

function notify() {
  notifier.notify(
    {
      title: 'My awesome title',
      message: 'Hello from node, Mr. User!',
      sound: 'Blow',
      contentImage: void 0,
      // Absolute path (doesn't work on balloons)
      icon: path.join(__dirname, 'images', 'tpp.jpg'),
      // Only Notification Center or Windows Toasters
      sound: true,
      // Wait with callback, until user action is taken against notification
      wait: true,
      // closeLabel: 'close',
      actions: ['forward'],
      timeout: 60,
      open: 'https://www.baidu.com'
    },
    function(err, response) {
      console.log(response)
      // Response is response from notification
    }
  )

  notifier.on('click', function(notifierObject, options) {
    console.log('click')
    // Triggers if `wait: true` and user clicks notification
  })

  notifier.on('timeout', function(notifierObject, options) {
    // Triggers if `wait: true` and notification closes
  })
}

notify()
// module.exports = notify
