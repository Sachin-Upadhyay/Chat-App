import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { COMPANY_LOGO } from '../../Constants/ImagesPath'
import Style, { PLACEHOLDER_COLOR, PRIMARY_COLOR } from "../../Constants/Style";
import { connect } from 'react-redux'
import DefaultPreference from 'react-native-default-preference';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function authenticateUser() {
    database()
      .ref('/users')
      .on('value', snapshot => {
        // console.log('User data: ', snapshot.val());
        var value = Object.entries(snapshot.val())
        for (var i = 0; i < value.length; i++) {
          if (value[i][1].email == email && value[i][1].password == password) {
            console.log(value[i])
            DefaultPreference.set('my key', '1').then(function () { console.log('done') });
            storeData(value[i])
            props.changeAuth()
            
            // props.navigation.navigate('BottomTab', { props: value[i] })
            console.log(i)
            break;
          }
          // else {
          //   alert('invalid details')
          // }
        }
        if (i >= value.length)
          alert('invalid details')
        // .map((item, index) => {
        //   console.log(item[1].email)

        //   if (item[1].email == email && item[1].password == password) {
        //     console.log('Login')
        //     return true
        //   }
        //   else {
        //     alert('invalid details')
        //   }
        // })
      });

  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('UserData', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={Style.login_signUp_container}>
        <StatusBar backgroundColor={PRIMARY_COLOR}></StatusBar>
        <Image style={Style.company_image_in_login_signUp} source={COMPANY_LOGO} />
        <View style={Style.input_container}>
          <TextInput
            style={Style.input_view}
            placeholder="Email."
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={Style.input_container}>
          <TextInput
            style={Style.input_view}
            placeholder="Password."
            placeholderTextColor={PLACEHOLDER_COLOR}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password ?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={{
            color: 'black'
          }}>
            Don't have account?
            <Text style={{
              color: PRIMARY_COLOR
            }}>
              SignUp
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[
          Style.button, { marginTop: 40, }]}
          onPress={() => authenticateUser()}>
          <Text style={Style.buttonText}>{props.Login}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

function mapStateToProps(state) {
  return {
    Login: state.Login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeAuth: () => dispatch({ type: 'changeAuthToLogedIn' }),
  }
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    color: 'black'
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);