import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem

} from '@react-navigation/drawer';
// import colors from '../../assets/colors/colors';


import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../Redux/Actions/AuthAction';
import LinearGradient from 'react-native-linear-gradient';
import HomeStack from './HomeStack';


Feather.loadFont();
MaterialCommunityIcons.loadFont();

const Drawer = createDrawerNavigator();

export default function MyDrawer(props) {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="Tab">

            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false, drawerType: 'slide' }} />

        </Drawer.Navigator>

    );
}
const CustomDrawer = props => {
    const colors = useSelector(state => state.colors.currentTheme);
    const { navigation } = props;
    const dispatch = useDispatch();
    const myUser = useSelector(state => state.auth.user)
    const orders = useSelector(state => state.orders.myOrders)
    // useEffect(()=>{
    //    alert(orders.length)
    // })
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
                    <Text style={{ color: colors.background, fontFamily: 'Montserrat-Bold', fontSize: 18, }}>{myUser ? myUser.name : "Please Login"}</Text>
                    <Text style={{ color: colors.background, fontFamily: 'Montserrat-regular', fontSize: 10 }}>{myUser && myUser.email ? myUser.email : ""}</Text>
                    <Text style={{ color: colors.background, fontFamily: 'Montserrat-Bold', fontSize: 10 }}>{myUser ? myUser.id : ""}</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20 }}>

                {/* HOME */}
                <DrawerItem
                    label="Home"
                    onPress={() => navigation.navigate('Home')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: colors.textTheme }}
                    icon={() => <AntDesign name="home" size={22} color={colors.textTheme} />}
                    pressColor={colors.primary}

                />

                {/* SETTING */}
                <DrawerItem
                    label='Setting'
                    onPress={() => navigation.navigate('Setting')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: colors.textTheme }}
                    icon={() => <Feather name="settings" size={22} color={colors.textTheme} />}
                    pressColor={colors.primary}

                />

                {/* SIGN UP */}
                {
                    !myUser ?
                        <DrawerItem
                            label={'Sign up'}
                            onPress={() => navigation.navigate('SignUp')}
                            labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: colors.textTheme }}
                            icon={() => <MaterialCommunityIcons name="login" size={22} color={colors.textTheme} />}
                            pressColor={colors.primary}

                        /> : null
                }
                {/* ORDER */}
                {
                    orders !== null && orders.length > 0 && myUser ?
                        <DrawerItem
                            label={`Orders  ${orders.length}`}
                            onPress={() => navigation.navigate('MyOrders')}
                            labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: colors.textTheme }}
                            icon={() => <AntDesign name="clockcircleo" size={22} color={colors.textTheme} />}
                            pressColor={colors.primary}

                        /> : null

                }

                {/* LOGOUT */}
                {
                    myUser ?
                        <DrawerItem
                            label="Logout"
                            onPress={() => logout()}
                            labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10, color: colors.textTheme }}
                            icon={() => <AntDesign name="logout" size={22} color={colors.textTheme} />}
                            pressColor={colors.primary}

                        /> : null
                }


            </View>

        </DrawerContentScrollView>
    )
}



