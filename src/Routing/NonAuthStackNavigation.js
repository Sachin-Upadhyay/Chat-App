//import liraries
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import ChatScreen from '../Screens/NonAuthScreen/ChatScreen'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/AuthScreen/Login';
import { navigationRef } from '../RootNavigation/rootNavigation';
const Stack = createNativeStackNavigator();

// create a component
export class MyClass extends Component {
    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="BottomTab" component={BottomTab} />
                    {/* <Stack.Screen name="Home" component={Home} /> */}
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    <Stack.Screen name="Login" component={Login} />

                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}
//make this component available to the app
export default MyClass;


