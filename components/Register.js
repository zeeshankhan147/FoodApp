import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator, ScrollView, TextInput, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from '@react-navigation/native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

export default function Register({ navigation }) {
    const [FirsName, setFirsName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Number, setNumber] = useState("")
    const [Password, setPassword] = useState("")
    useEffect(() => {
    }, [])
    
    function register(){
        alert(FirsName)
        
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


                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '40%', width: '100%', }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.secondary,fontFamily:'Montserrat-Bold' }}>
                        CREATE A ACCOUNT
                    </Text>
                    <View style={{ height: '100%' }}>
                        <TextInput
                            style={{ paddingHorizontal: 20, borderColor: colors.primary, borderWidth: 1, borderRadius: 20, width: 300, marginTop: 30 }}
                            placeholder={'First Name'}
                            onChange={(FN) => setFirsName(FN)}
                            


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, borderColor: colors.primary, borderWidth: 1, borderRadius: 20, width: 300, marginTop: 20 }}
                            placeholder={'Last Name'}
                            onChange={(LN) => setLastName(LN)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, borderColor: colors.primary, borderWidth: 1, borderRadius: 20, width: 300, marginTop: 20 }}
                            placeholder={'Email Address'}
                            onChange={(EM) => setEmail(EM)}
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, borderColor: colors.primary, borderWidth: 1, borderRadius: 20, width: 300, marginTop: 20 }}
                            placeholder={'Phone Number EX: 333-111-888'}
                            onChange={(NUM) => setNumber(NUM)}
                            keyboardType='number-pad'
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TextInput

                            style={{ paddingHorizontal: 20, borderColor: colors.primary, borderWidth: 1, borderRadius: 20, width: 300, marginTop: 20 }}
                            placeholder={'Create New Password'}
                            onChange={(PASS) => setPassword(PASS)}
                            secureTextEntry
                            autoCorrect={false}


                        >
                        </TextInput>
                        <TouchableOpacity style={{ width:300, height: 50, backgroundColor: '#ff4e4e', borderRadius: 20, alignItems: 'center', justifyContent: 'center',marginTop: 20 }}
                            onPress={()=> register()}
                        >
                            <Text style={{fontSize:15,color:'#fff',fontFamily:'Montserrat-Bold'}}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{alignItems:'center',marginTop:'35%'}}
                onPress={()=>Linking.openURL("https://loremipsum.com")}
                >
                <Text style={{marginBottom:25,fontFamily:'Montserrat-Regular',fontSize:12,}}>Privacy Policy - Terms & Condition  </Text>
                
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