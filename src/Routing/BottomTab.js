//import liraries
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../Screens/NonAuthScreen/Settings'
import NewMessage from '../Screens/NonAuthScreen/NewMessage'
import Home from '../Screens/NonAuthScreen/Home'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AllChatMember from '../Screens/NonAuthScreen/AllChatMembers';

const Tab = createBottomTabNavigator();

// create a component
class BottomTab extends Component {
    render() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Chat" component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Icon name="wechat" size={30} color={color} />
                            )
                        }
                    }} />

                <Tab.Screen name="NewMessage" component={AllChatMember} options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            // <Icon name="cog-outline" size={30} color="#919191" />
                            <MaterialCommunityIcons name='plus-circle' color={color} size={size}></MaterialCommunityIcons>

                        )
                    }
                }} />
                <Tab.Screen name="Setting" component={Settings}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <MaterialCommunityIcons name='cog-outline' color={color} size={size}></MaterialCommunityIcons>

                            )
                        }
                    }} />

            </Tab.Navigator>
        );
    }
}

//make this component available to the app
export default BottomTab;