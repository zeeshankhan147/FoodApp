import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React from 'react'
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

    const logout = () =>{
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
    const loginBtn = () =>{
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
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                marginTop: 10
            }}>
                <TouchableOpacity onPress={loginBtn}>
                {myUser ?
                    <Image source={{uri:myUser.photo}} style={{ width: 70, height: 70, borderRadius: 70, borderColor: colors.primary, borderWidth: 3 }}/> :
                    <Image source={require('../../assets/images/user2.png')} style={{ width: 70, height: 70, borderRadius: 70, borderColor: colors.primary, borderWidth: 3 }}/> 
                }
                    </TouchableOpacity>

                <View style={{ marginLeft: 12,marginRight:70 }}>
                    <Text style={{ color: colors.primary, fontFamily: 'Montserrat-Bold', fontSize: 16, }}>{myUser && myUser !== null ? myUser.name : "Please Login"}</Text>
                    <Text style={{ color: colors.textDark, fontFamily: 'Montserrat-regular', fontSize: 10 }}>{myUser && myUser !== null ? myUser.email : ""}</Text>
                    <Text style={{ color: colors.textDark, fontFamily: 'Montserrat-Bold', fontSize: 10 }}>{myUser ? myUser.id : ""}</Text>
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
                    label="REGISTER"
                    onPress={() => navigation.navigate('Register')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="account" size={22} />}

                />
                <DrawerItem
                    label="LOGOUT"
                    onPress={() => logout()}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="login" size={22} />}

                />

            </View>

        </DrawerContentScrollView>
    );
}
export default MyDrawer;


