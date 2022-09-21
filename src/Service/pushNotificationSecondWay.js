import * as RootNavigation from '../RootNavigation/rootNavigation';
import messaging from '@react-native-firebase/messaging';

const pushNotification = async (props) => {
    let token = await messaging().getToken();
    console.log("token " + JSON.stringify(token));

    messaging().onMessage(async remoteMessage => {
        console.log('Message handled in the foreground!', remoteMessage);
        RootNavigation.navigate('ChatScreen', { props: props[1].token, fullName: props[1].fullName, receiver: remoteMessage.data })

    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        RootNavigation.navigate('ChatScreen', { props: props[1].token, fullName: props[1].fullName, receiver: remoteMessage.data })

    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage,
                );
                RootNavigation.navigate('ChatScreen', { props: props[1].token, fullName: props[1].fullName, receiver: remoteMessage.data })

            }
        });
}

export default pushNotification;