import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Home from '../home';
import SignUp from '../signUp';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem

} from '@react-navigation/drawer';
import colors from '../../assets/colors/colors';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../Redux/Actions/AuthAction';


Feather.loadFont();
MaterialCommunityIcons.loadFont();

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
    const { navigation } = props;
    const dispatch = useDispatch();
    const myUser = useSelector(state => state.auth.user)

    useEffect(() => {
    }, [])

    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure logout user ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(logoutUser())
                        navigation.closeDrawer()
                    }
                },
            ],
            { cancelable: false }
        )
    }
    const loginBtn = () => {
        if (!myUser) {
            navigation.navigate('SignUp')
        }
    }

    return (
        <DrawerContentScrollView {...props}
            style={{
                backgroundColor: colors.background,
            }}>

            {/* <DrawerItemList {...props} /> */}

            <View style={{
                flexDirection: 'column',
                padding: 30,
                marginTop: -5,
                backgroundColor: colors.primary,
                borderBottomLeftRadius: 40,
            }}>
                <TouchableOpacity onPress={loginBtn}>
                    {myUser && myUser.photo !== null ?
                        <Image source={{ uri: myUser.photo }} style={{ width: 70, height: 70, borderRadius: 70, borderColor: colors.background, borderWidth: 3 }} /> :
                        <Image source={require('../../assets/images/user2.png')} style={{ width: 70, height: 70, borderRadius: 70, borderColor: colors.background, borderWidth: 3 }} />
                    }
                </TouchableOpacity>

                <View style={{ marginLeft: 5, marginRight: 70, marginTop: 10 }}>
                    <Text style={{ color: colors.background, fontFamily: 'Montserrat-Bold', fontSize: 18, }}>{myUser && myUser.name ? myUser.name : "Please Login"}</Text>
                    <Text style={{ color: colors.white, fontFamily: 'Montserrat-regular', fontSize: 10 }}>{myUser && myUser.email ? myUser.email : ""}</Text>
                    <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 10 }}>{myUser ? myUser.id : ""}</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20 }}>
                <DrawerItem
                    label="HOME"
                    onPress={() => navigation.navigate('Home')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="home" size={22} />}
                />
                <DrawerItem
                    label="MENU"
                    onPress={() => navigation.navigate('Register')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="menu" size={22} />}

                />
                <DrawerItem
                    label={myUser ? 'SETTING' : "REGISTER"}
                    onPress={myUser ? () => navigation.navigate('MyOrders') : () => navigation.navigate('Register')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="account" size={22} />}

                />
                {!myUser ?
                    <DrawerItem
                        label={'SIGN UP'}
                        onPress={() => navigation.navigate('SignUp')}
                        labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                        icon={() => <MaterialCommunityIcons name="login" size={22} />}

                    /> : null
                }

                {/* {myUser ? <View style={{ width: '60%', height: 0.5, backgroundColor: colors.textDark, marginTop: 20, }} /> : null} */}

                {myUser ?
                    <DrawerItem
                        label="LOGOUT"
                        onPress={() => logout()}
                        labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                        icon={() => <MaterialCommunityIcons name="logout" size={22} />}

                    /> : null
                }

            </View>

        </DrawerContentScrollView>
    );
}
export default MyDrawer;


