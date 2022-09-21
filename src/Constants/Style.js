import { StyleSheet } from "react-native";
export const PRIMARY_COLOR = "#703efe";
export const PLACEHOLDER_COLOR="#003f5c";
export default Style = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  login_signUp_container: {
    flex: 1,
    // backgroundColor: 'rgba(52, 52, 52, 0.4)',
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
  },
  company_image_in_login_signUp: {
    marginBottom: 40,
    width: "65%",
    height: '10%'
  },
  input_container:{
    backgroundColor: "#cab8fe",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  input_view:{
    width: "100%",
    marginLeft: 20
  }
})