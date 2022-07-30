import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator, ScrollView, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from '@react-navigation/native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
// import { auth } from '@react-native-firebase/auth';

export default function Register({ navigation }) {
    const [FirsName, setFirsName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Number, setNumber] = useState("")
    const [Password, setPassword] = useState("")
    useEffect(() => {
    }, [])

    const register = () => {
     console.log('authttt->>');

    //  auth().createUserWithEmailAndPassword('demo@gmail.com', '9839nknjd')
    //     .then(() => {
    //             console.log('User account created & signed in!');
    //         })
    //         .catch(error => {
    //             if (error.code === 'auth/email-already-in-use') {
    //                 console.log('That email address is already in use!');
    //             }

    //             if (error.code === 'auth/invalid-email') {
    //                 console.log('That email address is invalid!');
    //             }

    //             console.error(error);
    //         });
        
        // let userDetail = {}
        // let FN = false;
        // let LN = false;
        // let EM = false;
        // let NM = false;
        // let PS = false;

        // if (FirsName && LastName && Email && Number && Password) {
        //     if (FirsName) {
        //         FN = true;
        //     }
        //     else if (LastName) {
        //         LN = true;
        //     }
        //     else if (Email.length > 6) {
        //         EM = true;
        //     }
        //     else if (Number.length == 11) {
        //         NM = true;
        //     }
        //     else if (Password.length >= 8) {
        //         PS = true;
        //     }


        //     if (FN && LN && EM && NM && PS) {
        //         alert('Resgister Success')
        //     }

        // }
        // else {
        //     Alert.alert(`Something Went Wrong!`)
        // }

    }

    return (
        <View style={Styles.mainContainer}>
            {/* header */}
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>

                <SafeAreaView>
                    <View style={Styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={Styles.leftHeader}>
                                <Feather name='chevron-left' size={12} color={colors.textDark} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>


                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '30%', width: '100%', }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.secondary, fontFamily: 'Montserrat-Bold' }}>
                        CREATE A ACCOUNT
                    </Text>
                    <View style={{ height: '100%' }}>
                        <TextInput
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 30, }}
                            placeholder={'First Name'}
                            onChangeText={(FN) => setFirsName(FN)}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Last Name'}
                            onChangeText={(LN) => setLastName(LN)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Email Address'}
                            onChangeText={(EM) => setEmail(EM)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Phone Number EX: 333-111-888'}
                            onChangeText={(NUM) => setNumber(NUM)}
                            keyboardType='number-pad'
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderColor: colors.primary, borderWidth: 1, borderRadius: 10, width: 300, marginTop: 20 }}
                            placeholder={'Create New Password'}
                            onChangeText={(PASS) => setPassword(PASS)}
                            secureTextEntry
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#ff4e4e', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
                            onPress={() => register()}
                        >
                            <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Montserrat-Bold' }}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 30 }}
                            onPress={() => Linking.openURL("https://loremipsum.com")}
                        >
                            <Text style={{ marginBottom: 1, fontFamily: 'Montserrat-Regular', fontSize: 12, }}>Privacy Policy - Terms & Condition  </Text>

                        </TouchableOpacity>
                    </View>




                </View>



            </ScrollView>

        </View>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
        width: '100%'
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    leftHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CDCDCD',
        borderWidth: 2,
    },
    rightHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

    },

})