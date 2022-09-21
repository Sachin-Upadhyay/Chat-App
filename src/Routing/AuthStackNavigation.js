//import liraries
import React, { Component } from 'react';
import Intro from '../Screens/AuthScreen/Intro'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/AuthScreen/Login';
import SignUp from '../Screens/AuthScreen/SignUp';
import Home from '../Screens/NonAuthScreen/Home';
import Settings from '../Screens/NonAuthScreen/Settings';
import BottomTab from '../Routing/BottomTab';
import ChatScreen from '../Screens/NonAuthScreen/ChatScreen'
import NewMessage from '../Screens/NonAuthScreen/NewMessage';
import AllChatMember from '../Screens/NonAuthScreen/AllChatMembers';
import { navigationRef } from '../RootNavigation/rootNavigation';
const Stack = createNativeStackNavigator();

// create a component
class Navigation extends Component {
    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Intro" component={Intro} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Setting" component={Settings} />
                    <Stack.Screen name="BottomTab" component={BottomTab} />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    <Stack.Screen name="NewMessage" component={NewMessage} />
                    <Stack.Screen name="AllChatMember" component={AllChatMember} />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

//make this component available to the app
export default Navigation;

