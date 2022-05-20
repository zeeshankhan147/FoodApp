import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator,ScrollView, TextInput,Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';




export default function signUp  ({navigation}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
      
        GoogleSignin.configure();
    }, [])
    

     const googleSignUp = async () => {
        setLoading(true)
        try {
          await GoogleSignin.hasPlayServices();
        
          const userInfo = await GoogleSignin.signIn();
          console.log('userrr',userInfo);
          if (userInfo) {
              AsyncStorage.setItem('@userInfo',JSON.stringify(userInfo.user))
          }
          else{
              null
          }
          setLoading(false)

        } 
        catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            setLoading(false)

            // user cancelled the login flow
          console.log(error);

          } else if (error.code === statusCodes.IN_PROGRESS) {
            setLoading(true)

            // operation (e.g. sign in) is in progress already
          console.log(error);

          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          console.log('PLAY_SERVICES_NOT_AVAILABLE --->>',error);
            setLoading(false)

          

          } else {
            // some other error happened
          console.log(error);
          setLoading(false)

          }
        }
      };
    


    return (
        
        <View style={Styles.mainContainer}>
            {/* header */}
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
           
            <SafeAreaView>
                    <View style={Styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack() }>
                            <View style={Styles.leftHeader}>
                                <Feather name='chevron-left' size={12} color={colors.textDark} />
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </SafeAreaView>
                {loading ? (
                    <View style={{alignItems:'center',justifyContent:'center',marginTop:'50%',width:'100%',}}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ):(
                <View style={{alignItems:'center',justifyContent:'center',marginTop:'40%',width:'100%',}}>
                <Text style={{fontSize:25,fontWeight:'600',color:colors.secondary,fontFamily:'Montserrat-Bold'}}>
                    PLEASE LOGIN!
                </Text>
                <View style={{height:200}}> 
                <TextInput
                style={{paddingHorizontal:20, borderColor:colors.primary,borderWidth:1,borderRadius:20,width:300,marginTop:40}}
                placeholder={'Email Address'}
                onChangeText={(em)=> setEmail(em)}
                keyboardType="email-address"
                
                
                >
                </TextInput>
                <TextInput
                
                style={{paddingHorizontal:20,borderColor:colors.primary,borderWidth:1,borderRadius:20,width:300,marginTop:20}}
                placeholder={'Password'}
                onChangeText={(pass)=> setPassword(pass)}
                secureTextEntry
                autoCorrect={false}
                
                
                >
                </TextInput>
                <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
                <Text style={{alignSelf:'center',marginTop:15, fontSize:12,color:'#1a73e8',borderBottomWidth:0.7,fontFamily:'Montserrat-SemiBold',borderColor:'#1a73e8'}}>Account! Register?</Text>

                </TouchableOpacity>
                </View>
                <Text style={{marginTop:50,fontFamily:'Montserrat-Bold'}}>Or Sign up Other Option</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',width:'50%',marginTop:20}}>
                    <TouchableOpacity style={{width:55,height:50,backgroundColor:'#ff4e4e',borderRadius:10,alignItems:'center',justifyContent:'center'}}
                    onPress={googleSignUp}
                    >
                    <MaterialCommunityIcons name='google' size={22} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:55,height:50,backgroundColor:'#1a73e8',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <MaterialCommunityIcons name='facebook' size={22} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:55,height:50,backgroundColor:'#000',borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <MaterialCommunityIcons name='apple' size={22} color={colors.white} />
                    </TouchableOpacity>
                </View>

                
            </View>


                )}

            

            
                <TouchableOpacity  style={{alignItems:'center',marginTop:'35%'}}
                onPress={()=>Linking.openURL("https://loremipsum.com")}
                >
                <Text style={{marginBottom:30,fontFamily:'Montserrat-Regular',fontSize:12,}}>Privacy Policy - Terms & Condition  </Text>
                
                </TouchableOpacity>
                </ScrollView>
               
        </View>


    );
}
const Styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.background,
        width:'100%'
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