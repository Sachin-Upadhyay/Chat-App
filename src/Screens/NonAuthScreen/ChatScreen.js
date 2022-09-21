//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { Avatar, Badge } from '@rneui/themed';

import { PRIMARY_COLOR } from '../../Constants/Style';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from 'moment';
import database from '@react-native-firebase/database';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dialog } from 'react-native-simple-dialogs';


// create a component
// let DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         message: 'Hi',
//         time: '2014-02-17T08:30:00',
//         image: 'https://randomuser.me/api/portraits/men/41.jpg',
//         sendBy: 'sender'

//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         message: 'Hi',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'receiver'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         message: 'How are you',
//         time: '2014-02-17T08:30:00',
//         image: 'https://randomuser.me/api/portraits/men/41.jpg',
//         sendBy: 'sender'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72a',
//         message: 'Good, how about you!',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'sender'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72s',
//         message: 'I am good too',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'receiver'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72d',
//         message: 'Lets meet',
//         time: '2014-02-17T08:30:00',
//         image: 'https://randomuser.me/api/portraits/men/41.jpg',
//         sendBy: 'receiver'


//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72f',
//         message: 'Yes ofcourse',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'receiver'
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72g',
//         message: 'How about your bussiness',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'sender'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72h',
//         message: 'its fine too',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'sender'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72j',
//         message: 'How about your family',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'receiver'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72t',
//         message: 'They are fine too',
//         time: '2014-02-17T08:30:00',
//         image: 'https://randomuser.me/api/portraits/men/41.jpg',
//         sendBy: 'sender'


//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72r',
//         message: 'Lets meet then',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'sender'

//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72w',
//         message: 'Ya ofcourse',
//         time: '2014-02-17T08:30:00',
//         image: null,
//         sendBy: 'receiver'

//     },
// ];
// DATA.reverse()
// create a component
var onChildAdd;
class MyClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            DATA: [],
            msgType: 'text',
            image: null,
            dialogVisible: false
        }
    }
    getTime(time) {
        return moment(time).format('h:mm a');
    }
    componentDidMount() {
        console.log('hi' + JSON.stringify(this.props.route.params))
        // console.log("receiver"+JSON.stringify(this.props.route.params.receiver.token))

        onChildAdd = database()
            .ref('/messages/' + this.props.route.params.receiver.roomId)
            .on('child_added', snapshot => {
                console.log('A new node has been added', snapshot.val());
                this.setState({
                    DATA: [...this.state.DATA, snapshot.val()]
                })
            });

    }
    componentWillUnmount() {
        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + this.props.route.params.receiver.roomId).off('child_added', onChildAdd);

    }

    msgValid = text => text && text.replace(/\s/g, '').length;
    appendData() {


        // if (this.state.message == "Type here..." || this.msgValid(this.state.message) == 0 || this.state.image=="") {
        //     return false
        // }

        var obj = {
            // id: Math.random(),
            message: this.state.message,
            from: this.props.route.params.props,
            to: this.props.route.params.receiver.token,
            sendTime: moment().format(),
            msgType: this.state.msgType,
            image: this.state.image,
            roomId: this.props.route.params.receiver.roomId
        }
        console.log(obj)
        const newReference = database().ref('/messages/' + this.props.route.params.receiver.roomId).push();

        console.log('Auto generated key: ', newReference.key);
        obj.id = newReference.key
        newReference
            .set(obj)
            .then(() => {
                let chatUpdayeScreen = {
                    lastmsg: this.state.message,
                    sendTime: obj.sendTime
                }
                database()
                    .ref('/chatList/' + this.props.route.params.receiver.token + "/" + this.props.route.params.props)
                    .update(chatUpdayeScreen)
                    .then(() => console.log('Data updated.'));

                database()
                    .ref('/chatList/' + this.props.route.params.props + "/" + this.props.route.params.receiver.token)
                    .update(chatUpdayeScreen)
                    .then(() => this.setState({ message: "",image:null }));
            });
    }

    async launchCamera(options, callback) {
        this.setState({
            dialogVisible: false
        })

        // You can also use as a promise without 'callback':
        var result = await launchCamera(options);
        console.log(result)
        console.log(result.assets[0].uri)
        this.setState({
            image: result.assets[0].uri,
            msgType:'image'
        })
        this.appendData()
    }
    async launchImageLibrary(options, callback) {
        this.setState({
            dialogVisible: false
        })
        // You can also use as a promise without 'callback':
        var result = await launchImageLibrary(options);
        console.log(result)
        console.log(result.assets[0].uri)
        this.setState({
            image: result.assets[0].uri,
            msgType:'image'
        })
        this.appendData()
    }




    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


                <View style={styles.container}>
                    <View style={{
                        backgroundColor: 'white',
                        paddingTop: 20,
                        paddingBottom: 20,
                        paddingRight: 10,
                        margin: 5,
                        borderRadius: 10,
                        flexDirection: 'row'
                    }}>
                        <Dialog
                            visible={this.state.dialogVisible}
                            title="Select Image ..."
                            titleStyle={{ color: PRIMARY_COLOR }}
                            onTouchOutside={() => this.setState({ dialogVisible: false })} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                {/* // your content here */}
                                <TouchableOpacity onPress={() => this.launchCamera()}>
                                    <MaterialCommunityIcons name='camera' size={45} color={PRIMARY_COLOR}></MaterialCommunityIcons>

                                    <Text style={{ fontSize: 15, color: 'black' }}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.launchImageLibrary()}>
                                    <MaterialCommunityIcons name='image' size={45} color={PRIMARY_COLOR}></MaterialCommunityIcons>

                                    <Text style={{ fontSize: 15, color: 'black' }}>Gallery</Text>
                                </TouchableOpacity>

                            </View>
                        </Dialog>
                        <View style={{ justifyContent: 'center' }}>
                            <MaterialCommunityIcons name='arrow-left-thin' size={35} color={'black'} onPress={() => this.props.navigation.goBack()}></MaterialCommunityIcons>
                        </View>
                        <View>
                            <Avatar
                                rounded
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                                }}
                                size="medium"
                            />

                            <Badge
                                width={10}
                                status="success"
                                containerStyle={{
                                    position: 'absolute',
                                    top: 38,
                                    left: 40
                                }}
                            />
                        </View>
                        <View style={{
                            marginLeft: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 15

                            }}>
                                {this.props.route.params.receiver.fullName}
                            </Text>
                            <Text style={{
                                color: 'green',
                            }}>
                                online
                            </Text>

                        </View>
                        <View style={{
                            // alignItems: 'flex-end',
                            flex: 1,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                            <MaterialCommunityIcons name='video-outline' size={35} color={'#919191'} style={{ marginRight: 20 }}></MaterialCommunityIcons>
                            <MaterialCommunityIcons name='phone' size={25} color={'#919191'} style={{ marginRight: 10 }}></MaterialCommunityIcons>


                        </View>
                    </View>

                    <FlatList
                        data={[...this.state.DATA].reverse()}
                        inverted
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{}}>
                                    <View style={{
                                        maxWidth: '80%',
                                        alignSelf: item.from == this.props.route.params.props ? 'flex-end' : 'flex-start'
                                    }}>
                                        <View style={{
                                            backgroundColor: item.from == this.props.route.params.props ? 'white' : PRIMARY_COLOR,
                                            padding: 10,
                                            margin: 5,
                                            borderRadius: 10,
                                            flexDirection: 'row',
                                            maxWidth: '80%',
                                            alignSelf: item.from == this.props.route.params.props ? 'flex-end' : 'flex-start'
                                        }}>

                                            <View style={{
                                                marginLeft: 10,
                                                justifyContent: 'center',
                                                marginRight: 10,
                                            }}>
                                                {item.image != "" && <Image source={{ uri: item.image }} style={{ width: 200, height: 100 }}></Image>}
                                                <Text style={{
                                                    color: 'black',
                                                    fontWeight: 'bold',

                                                }}>
                                                    {item.message}
                                                </Text>

                                            </View>

                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                            <Text style={{ fontSize: 13, color: 'grey' }}>{this.getTime(item.time)}</Text>
                                            <MaterialCommunityIcons name='check-all' size={20} color={'#919191'} style={{ marginLeft: 5 }}></MaterialCommunityIcons>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />

                    <View style={{ justifyContent: 'flex-end' }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 20,
                            margin: 5,
                            borderRadius: 10,
                        }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#fafafa', alignItems: 'center', borderRadius: 10, }}>
                                <TextInput placeholder="Type here..." value={this.state.message} onChangeText={(value) => { this.setState({ message: value }) }} style={{ flex: 1, borderRadius: 10, }}></TextInput>
                                <MaterialCommunityIcons name='image' size={25} color={PRIMARY_COLOR} style={{ marginRight: 10 }} onPress={() => {
                                    this.setState({ dialogVisible: true })
                                }}></MaterialCommunityIcons>
                                <MaterialCommunityIcons name='send' size={25} color={PRIMARY_COLOR} style={{ marginRight: 10 }} onPress={() => {
                                    this.appendData();
                                    this.setState({
                                        msgType:'text'
                                    })
                                }}></MaterialCommunityIcons>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
});

//make this component available to the app
export default MyClass;
