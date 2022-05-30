import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
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


Feather.loadFont();
MaterialCommunityIcons.loadFont();

const Drawer = createDrawerNavigator();

function MyDrawer(props) {
    const { navigation } = props;
    function clear() {
        AsyncStorage.removeItem('@cartItem')
        ToastAndroid.show("Clear Cart", ToastAndroid.SHORT);


    }
    return (
        <DrawerContentScrollView {...props}
            style={{
                backgroundColor: colors.background,
            }}>

            {/* <DrawerItemList {...props} /> */}

            {/* <TouchableOpacity style={{position:'absolute',right:7,top:7,backgroundColor:'#000',borderRadius:10}} onPress={()=> navigation.closeDrawer()}>
                    <MaterialCommunityIcons name="close" size={20} color={'white'}/>
                </TouchableOpacity> */}
                
            <View style={{
                // backgroundColor:'red',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                marginTop: 10
            }}>
                <Image source={require('../../assets/images/profile.jpg')} style={{ width: 70, height: 70, borderRadius: 70, borderColor: colors.primary, borderWidth: 3 }} />

                <View style={{ marginLeft: 12, }}>
                    <Text style={{ color: colors.primary, fontFamily: 'Montserrat-Bold', fontSize: 16, }}>Zeeshan Khan</Text>
                    <Text style={{ color: colors.textDark, fontFamily: 'Montserrat-regular', fontSize: 10 }}>mdzeeshankhan147@gmail.com</Text>
                    <Text style={{ color: colors.textDark, fontFamily: 'Montserrat-Bold', fontSize: 10 }}>+92-3368153445</Text>
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
                    label="SETTING"
                    onPress={() => navigation.navigate('Search')}
                    labelStyle={{ paddingBottom: 0, fontFamily: 'Montserrat-Bold', marginLeft: -10 }}
                    icon={() => <MaterialCommunityIcons name="login" size={22} />}



                />

            </View>

        </DrawerContentScrollView>
    );
}
export default MyDrawer;


