//import liraries
import React, { Component } from 'react';
import AuthStackNavigation from './src/Routing/AuthStackNavigation';
import NonAuthStackNavigation from './src/Routing/NonAuthStackNavigation';

import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import DefaultPreference from 'react-native-default-preference';
import { ActivityIndicator } from 'react-native';
import { PRIMARY_COLOR } from './src/Constants/Style';
import Index from './src/Screens/index'

// create a component
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth: 0
    }
  }


  async componentDidMount() {
    // DefaultPreference.get('my key').
    //   then((value) => { value == 1 && this.setState({ auth: 1 }) })
    //   this.forceUpdate()
  }



  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

//make this component available to the app
export default App;


// //import liraries
// import React, { Component } from 'react';
// import { TextInput } from 'react-native';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// class MyClass extends Component {
//   state = {
//     data: 1
//   }
//   change = (x) => {
//     this.setState({
//       data: x * 10
//     })
//     return x * 10;
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>MyClass</Text>
//         <TextInput
//           testID='username'
//           placeholder='Enter Your name'></TextInput>
//       </View>
//     );
//   }
// }

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//   },
// });

// //make this component available to the app
// export default MyClass;
