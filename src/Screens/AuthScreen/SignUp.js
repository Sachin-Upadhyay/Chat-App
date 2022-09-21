import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { COMPANY_LOGO } from '../../Constants/ImagesPath'
import Style, { PLACEHOLDER_COLOR, PRIMARY_COLOR } from "../../Constants/Style";
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [aboutUs,setAboutUS]=useState("I am superstar");

  const registerUser = () => {
    let token = uuid.v4();

    if (email != "" && password != "" && confirmPassword != "" && fullName != "") {
      database()
        .ref('/users/' + token)
        .set({
          email: email,
          password: password,
          fullName: fullName,
          token: token,
          img: "https://randomuser.me/api/portraits/men/41.jpg",
          about: aboutUs,
          lastmsg:""
        })
        .then(() => {
          console.log('Data set.')
          setEmail("")
          setFullName("")
          setPassword("")
          setconfirmPassword("")
          props.navigation.navigate('Login')
        });
    }
    else {
      alert("Fill all details")
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
            placeholder="Full Name."
            value={fullName}
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={(email) => setFullName(email)}
          />
        </View>
        <View style={Style.input_container}>
          <TextInput
            style={Style.input_view}
            placeholder="Email."
            value={email}
            placeholderTextColor={PLACEHOLDER_COLOR}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={Style.input_container}>
          <TextInput
            style={Style.input_view}
            placeholder="Password."
            value={password}
            placeholderTextColor={PLACEHOLDER_COLOR}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View style={Style.input_container}>
          <TextInput
            style={Style.input_view}
            placeholder="Confirm Pasword."
            value={confirmPassword}
            placeholderTextColor={PLACEHOLDER_COLOR}
            secureTextEntry={true}
            onChangeText={(password) => setconfirmPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={{
            color: PRIMARY_COLOR,
            fontSize: 16
          }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => registerUser()} style={[
          Style.button, { marginTop: 20 }]}>
          <Text style={
            Style.buttonText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}