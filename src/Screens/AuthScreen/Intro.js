import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Style, { PRIMARY_COLOR } from '../../Constants/Style';
import { INTRO_IMAGES } from '../../Constants/ImagesPath'

const slides = [
  {
    key: 1,
    title: 'Enjoy the new Experience of chating with global',
    text: 'Connect the people around the world for free',
    image: INTRO_IMAGES,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Quote 2',
    text: 'A man can be destroyed but not defeated.',
    image: INTRO_IMAGES,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Take a step back',
    text: 'And Start Again',
    image: INTRO_IMAGES,
    backgroundColor: '#22bcb5',
  }
];

export default class Intro extends React.Component {

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <StatusBar backgroundColor={PRIMARY_COLOR}></StatusBar>
        <Image source={item.image} style={{ width: "100%",height:"64%" }}>
        </Image>
        <View style={{
          // flex: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -15
        }}>
          <Text style={
            styles.title}>
            {item.title}
          </Text>
          <Text style={
            styles.text}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.props.navigation.navigate('Login')
  }

  showNext = () => {
    return (
      <View style={[Style.button, { alignSelf: 'center' }]} >
        <Text style={Style.buttonText}>Next</Text>
      </View>
    )
  }

  _renderDoneButton = () => {
    return (
      <View style={[Style.button, { alignSelf: 'center' }]} >
        <Text style={Style.buttonText}>Get Started</Text>
      </View>
    )
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          activeDotStyle={{ backgroundColor: PRIMARY_COLOR }}
          onDone={this._onDone}
          bottomButton={true}
          renderNextButton={this.showNext}
          renderDoneButton={this._renderDoneButton} />
        <Text style={{
          color: 'black',
          alignSelf: 'center',
          marginBottom: 12
        }} onPress={this.changeData}>
          Powerded by
          <Text style={{
            color: PRIMARY_COLOR,
            fontWeight: 'bold'
          }}>
            #Technossus
          </Text>
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 17,
    paddingTop: 15
  },
  title: {
    paddingTop: 15,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
});


// const App = () => {
//   const [sliderState, setSliderState] = useState({ currentPage: 0 });
//   const { width, height } = Dimensions.get('window');

//   const setSliderPage = (event: any) => {
//     const { currentPage } = sliderState;
//     const { x } = event.nativeEvent.contentOffset;
//     const indexOfNextScreen = Math.floor(x / width);
//     if (indexOfNextScreen !== currentPage) {
//       setSliderState({
//         ...sliderState,
//         currentPage: indexOfNextScreen,
//       });
//     }
//   };

//   const { currentPage: pageIndex } = sliderState;

//   return (
//     <>
//       <StatusBar hidden={true} />
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView
//           style={{ flex: 1, marginTop: 25 }}
//           horizontal={true}
//           scrollEventThrottle={16}
//           pagingEnabled={true}
//           showsHorizontalScrollIndicator={false}
//           onScroll={(event: any) => {
//             setSliderPage(event);
//           }}
//         >
//           <View style={{ width, height }}>
//             {/* <Image source={require('./src/assets/images/brown-wooden-planks-889839.jpg')} style={styles.imageStyle} /> */}
//             <Image source={require('../assets/intro.png')} style={styles.imageStyle}>
//             </Image>

//             <View style={styles.wrapper}>
//               <Text style={styles.header}>Nature Imitates Art</Text>
//               <Text style={styles.paragraph}>....something like that</Text>
//             </View>
//           </View>
//           <View style={{ width, height }}>

//             <View style={styles.wrapper}>
//               <Text style={styles.header}>High quality Art work</Text>
//               <Text style={styles.paragraph}>... for a fraction of the price</Text>
//             </View>
//           </View>
//           <View style={{ width, height }}>
//             {/* <Image
//               source={require('./src/assets/images/gray-and-black-digital-wallpaper-1573434.jpg')}
//               style={styles.imageStyle}
//             /> */}
//             <View style={styles.wrapper}>
//               <Text style={styles.header}>Top Notch Artists</Text>
//               <Text style={styles.paragraph}>... all in one place</Text>
//             </View>
//           </View>
//           <View style={{ width, height }}>
//             {/* <Image
//               source={require('./src/assets/images/pink-and-purple-wallpaper-1616403.jpg')}
//      /+        style={styles.imageStyle}
//             /> */}
//             <View style={styles.wrapper}>
//               <Text style={styles.header}>Best deal on the market</Text>
//               <Text style={styles.paragraph}>... let's find your next art</Text>
//             </View>
//           </View>
//           <View style={{ width, height }}>
//             {/* <Image
//               source={require('./src/assets/images/woman-s-face-1988681.jpg')}
//               style={styles.imageStyle}
//             /> */}
//             <View style={styles.wrapper}>
//               <Text style={styles.header}>It's all about art</Text>
//               <Text style={styles.paragraph}>... seriously, it is</Text>
//             </View>
//           </View>
//         </ScrollView>
//         {/* <View style={styles.paginationWrapper}>
//           {Array.from(Array(5).keys()).map((key, index) => (
//             <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
//           ))}
//         </View> */}
//         {console.log(pageIndex)}
//         <View style={{ alignItems: 'center', marginBottom: 25 }}>
//           {pageIndex==2 &&
          
//           <TouchableOpacity style={styles.loginBtn} >
//             <Text style={styles.loginText}>Get Started</Text>
//           </TouchableOpacity>
// }
//           <Text style={{ marginTop: 10, color: 'black', }}>Powerded by <Text style={{ color: '#703efe', fontWeight: 'bold' }}>Technossus</Text></Text>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   imageStyle: {
//     height: PixelRatio.getPixelSizeForLayoutSize(150),
//     width: '100%',
//   },
//   wrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 30,
//   },
//   header: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   paragraph: {
//     fontSize: 17,
//   },
//   paginationWrapper: {
//     position: 'absolute',
//     bottom: 200,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   paginationDots: {
//     height: 10,
//     width: 10,
//     borderRadius: 10 / 2,
//     backgroundColor: '#0898A0',
//     marginLeft: 10,
//   },
//   loginBtn: {
//     width: "80%",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#703efe",
//   },
//   loginText: {
//     color: 'white',
//     fontSize: 18
//   }
// });

// export default App