const options = {"firebaseVersion":"7.14.1","config":{"apiKey":"AIzaSyBjG_rG7dp2-IqxI_28nUfG5MlcpiNpjmo","authDomain":"schoolly-37aa8.firebaseapp.com","databaseURL":"https:\u002F\u002Fschoolly-37aa8.firebaseio.com","projectId":"schoolly-37aa8","storageBucket":"schoolly-37aa8.appspot.com","messagingSenderId":"590078046901","appId":"1:590078046901:web:d30773daf7967d8d1b84fc","measurementId":"G-LN58DKHESW","fcmPublicVapidKey":"BBG4nnNh0FJ8epcWubtkEXbwFTeDUskL0muMatOllpVPJVPJVG_2Yl2Pk1nkxTMD7IhgXuVCnlU7v2sK127Frus"},"onFirebaseHosting":false}
const version = options.firebaseVersion
const onFirebaseHosting = options.onFirebaseHosting

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js')
  importScripts('/__/firebase/' + version + '/firebase-messaging.js')
  importScripts('/__/firebase/init.js')
}
else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  )
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-messaging.js'
  )
  firebase.initializeApp(options.config)
}

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action
  const action = e.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow(clickAction)
    notification.close()
  }
})
