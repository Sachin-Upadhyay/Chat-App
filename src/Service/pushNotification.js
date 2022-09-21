import PushNotification, { Importance } from 'react-native-push-notification';
import * as RootNavigation from '../RootNavigation/rootNavigation';

const pushNotification = (props) => {

    PushNotification.configure({
        largeIcon: "ic_launcher",
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: async function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: async function (notification) {
            console.log("NOTIFICATION:", notification);
            if (notification.foreground == false)
                // setTimeout(() => {
                    RootNavigation.navigate('ChatScreen', { props: props[1].token, fullName: props[1].fullName, receiver: notification.data })

                // }, 5000)
            //   thisd.props.navigation.navigate('ChatScreen', { props: thisd.state.UserData[1].token,fullName:thisd.state.UserData[1].fullName, receiver: notification.data })
            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },
        // senderID: "350555101734",
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
    PushNotification.createChannel(
        {
            channelId: "123456987", // (required)
            channelName: "My channel123", // (required)
            // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            // playSound: false, // (optional) default: true
            // soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            // vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => {
            console.log("created" + created)
            // (optional) callback returns whether the channel was created, false means it already existed.
        }
    );
}

export default pushNotification;