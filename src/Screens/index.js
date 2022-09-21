//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AuthStackNavigation from '../Routing/AuthStackNavigation';
import NonAuthStackNavigation from '../Routing/NonAuthStackNavigation';
import DefaultPreference from 'react-native-default-preference';
import pushNotification from '../Service/pushNotification';
import pushNotificationSecondWay from '../Service/pushNotificationSecondWay';

import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
class MyClass extends Component {
    state = {

    }

    componentDidMount(){
        this.getData()
    }

      getData=async ()=> {
        try {
            const value = await AsyncStorage.getItem('UserData')
            if (value !== null) {
                const UserData = JSON.parse(value)
                pushNotificationSecondWay(UserData)
            }
        } catch (e) {
            // error reading value
        }
    }

    static getDerivedStateFromProps(props, state) {
        DefaultPreference.get('my key').
            then((value) => { value == 1 && props.changeAuth() })
        return props
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.Auth == 0 ? <AuthStackNavigation /> : <NonAuthStackNavigation />}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

function mapStateToProps(state) {
    return {
        Auth: state.Auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAuth: () => dispatch({ type: 'changeAuthToLogedIn' })
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MyClass);
