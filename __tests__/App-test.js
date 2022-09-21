/**
 * @format
 */

import 'react-native';
import React from 'react';
// import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SignUp from '../src/Screens/AuthScreen/SignUp';



// jest.mock('react-native-app-intro-slider', () => 'Video');
// jest.mock('@rneui/themed', () => 'Video');
// jest.mock('redux', () => 'Video');
// jest.mock('react-redux', () => 'Video');
// jest.mock('react-native-vector-icons', () => 'Video');
jest.mock('react-native-uuid', () => 'Video');
// jest.mock('react-native-simple-dialogs', () => 'Video');
// jest.mock('react-native-screens', () => 'Video');
// jest.mock('react-native-image-picker', () => 'Video');
// jest.mock('react-native-default-preference', () => 'Video');
// jest.mock('@rneui/base', () => 'Video');
// jest.mock('@reduxjs/toolkit', () => 'Video');
// jest.mock('@react-navigation/native-stack', () => 'Video');
// jest.mock('@react-navigation/native', () => 'Video');
// jest.mock('@react-navigation/bottom-tabs', () => 'Video');
jest.mock('@react-native-firebase/database', () => 'Video');
// jest.mock('@react-native-firebase/app', () => 'Video');
// jest.mock('@react-native-async-storage/async-storage', () => 'Vid22eo');
// jest.mock('react-native-vector-icons/FontAwesome', () => 'Vid22eo');
// jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Vid22eo');

it('renders correctly', () => {
  const wrapper= renderer.create(<SignUp />);
  // console.log(wrapper)
  expect(wrapper).toBeDefined();

    // expect(wrapper).toMatchSnapshot();
});

it('function Testing',()=>{
  const wrapper=renderer.create(
    <App/>
  ).getInstance()
  expect(wrapper.change(2)).toEqual(20)
});

it('state Testing',()=>{
  const wrapper=renderer.create(
    <App/>
  ).getInstance()
  wrapper.change(2)
  expect(wrapper.state.data).toEqual(20)
})

let findElement=function(tree,element){
  let result=undefined;
  for(node in tree.children){
    if(tree.children[node].props.testID==element){
      result=true
    }
  }
  return result
}

it('find element',()=>{
  const tree=renderer.create(
    <App/>
  ).toJSON()
  expect(findElement(tree,'username')).toBeDefined();
})
