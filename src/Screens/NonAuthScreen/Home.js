//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { Avatar, Badge } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SearchBar } from "@rneui/themed";
import { PRIMARY_COLOR } from '../../Constants/Style';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        message: 'First Message',
        time: '9:40 Am'

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        message: 'Second Message',
        time: '9:40 Am'

    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        message: 'Third Message',
        time: '9:40 Am'

    },
];
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            chatList: [],
            UserData: ''
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    componentDidMount() {
        this.getData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        // this.getAllUser()
        // console.log(this.props.route.params.props[1].token)
    }

    getAllUser() {
        database()
            .ref('/chatList/' + this.state.UserData[1].token)
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());

                if (snapshot.val() != null)
                    // this.setState({ chatList: Object.values(snapshot.val()).filter((value) => value.token != this.props.route.params.props[1].token) })
                    this.setState({ chatList: Object.values(snapshot.val()) })
            });

    }

    createChatList(item) {
        // let roomId = uuid.v4()
        // let myData = {
        //     fullName: this.props.route.params.props[1].fullName,
        //     img: "https://randomuser.me/api/portraits/men/41.jpg",
        //     emailId: this.props.route.params.props[1].email,
        //     about: "I am superstar",
        //     lastmsg: "",
        //     roomId: roomId,
        //     token: this.props.route.params.props[1].token
        // }
        // database()
        //     .ref('/chatList/' + item.token + "/" + this.props.route.params.props[1].token)
        //     .update(myData)
        //     .then(() => console.log('Data updated.'));

        // delete item['password'];
        // item.lastmsg = "";
        // item.roomId = roomId
        // database()
        //     .ref('/chatList/' + this.props.route.params.props[1].token + "/" + item.token)
        //     .update(item)
        //     .then(() => console.log('Data updated.'));
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('UserData')
            if (value !== null) {
                // value previously stored
                this.setState({
                    UserData: JSON.parse(value)

                })
                this.getAllUser()
            }
        } catch (e) {
            // error reading value
        }
    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatScreen', { props: this.state.UserData[1].token, receiver: item })}>
                {/* <TouchableOpacity onPress={() => this.createChatList(item)}> */}

                {/* {console.log("item"+JSON.stringify(item))} */}
                <View style={{
                    backgroundColor: 'white',
                    padding: 10,
                    margin: 5,
                    borderRadius: 10,
                    flexDirection: 'row'
                }}>
                    <View>
                        <Avatar
                            rounded
                            source={{
                                uri: item.img,
                            }}
                            size="large"
                        />

                        <Badge
                            width={10}
                            status="success"
                            containerStyle={{
                                position: 'absolute',
                                top: 55,
                                left: 63
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: 10,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}>
                            {item.fullName}
                        </Text>
                        <Text style={{
                            color: 'grey',
                        }}>
                            {item.lastmsg}
                        </Text>

                    </View>
                    <View style={{
                        alignItems: 'flex-end',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'grey',
                        }}>
                            {moment(item.sendTime).format('h:mm a')}
                        </Text>
                        <View style={{
                            backgroundColor: PRIMARY_COLOR,
                            width: 25,
                            height: 25,
                            borderRadius: 30,
                            marginTop: 7,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'white'
                            }}>
                                2
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <SearchBar
                        placeholder="Search..."
                        onChangeText={(value) => this.setState({ value: value })}
                        value={this.state.value}
                        containerStyle={{
                            flex: 1,
                            backgroundColor: 'white',
                            borderRadius: 15,
                            height: 55
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 15,
                            height: 40
                        }}
                        lightTheme={true}
                    />
                    <View style={{
                        backgroundColor: 'white',
                        marginLeft: 10,
                        justifyContent: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 10
                    }}>
                        <Icon name="edit" size={20} color="#919191" />
                    </View>
                </View>
                <FlatList
                    data={this.state.chatList.reverse()}
                    renderItem={({ item }) => this.renderItem({ item })}
                    keyExtractor={item => item.token}
                />

            </View>
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
export default Home;
