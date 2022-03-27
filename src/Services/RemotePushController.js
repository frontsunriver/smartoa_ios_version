import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const RemotePushController = ({onToken}) => {

  // const requestUserPermission = async () => {
  //   await messaging().requestPermission();
  // }
 
  // const getToken = async () => {
  //   const fcmToken = await firebase.messaging().getToken();  
  //   if (fcmToken) {
  //     // user has a device token set it into store
  //     await AsyncStorage.setItem('fcmToken',fcmToken);  
  //   } else{
  //     NotificationService.error(constant.error, 'Could not get the FCM token');
  //   }
  // }
  useEffect(() => {
    // getToken();

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        // console.log('TOKEN:', token);
        onToken(token.token)
      },
// (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        PushNotification.localNotification({
          autoCancel: true,
          title: notification.title,
          message: notification.message,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default'
        })
// process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '143680322716',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
  // requestUserPermission();

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   //This handler is called when notification is delivered in the background.
  //   //Handle the background notification here
  //   console.log('Message handled in the background!', remoteMessage);
  // });
return null
}
export default RemotePushController