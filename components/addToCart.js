import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCart from './productCart';


export default AddToCart = ({ route, navigation }) => {
    let myPrice = 0;
    let currency = 'Rs';
    let DiscountPercent = 50;
    let TaxPercent = 19;
    const [cartData, setCartData] = useState([]);
    const [qtyPlus, setQtyPlus] = useState(1)
    const [updateTotalAmount, setUpdateTotalAmount] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [delivery, setDelivery] = useState(0)
    let TotalAmount = (updateTotalAmount * DiscountPercent / 100)+(updateTotalAmount * TaxPercent / 100);


    const addQuantity = (price,qty) => {
        // setQtyPlus(qty)
        setUpdateTotalAmount(updateTotalAmount + (price * (qty-1)))
        
    }
    const removeQuantity = (price,qty) => {
        // setQtyPlus(qty)
        setUpdateTotalAmount(updateTotalAmount - (price * (qty-1)))


    }

    useEffect(() => {
        

        AsyncStorage.getItem('k2').then((value) => {
            const data = JSON.parse(value)
            if (data != null) {
                // console.log('milgya_data ', data);
                setCartData(data)


            }
            else {
                console.log('something else');
            }
        })

    }, [])

    const renderComponentItem = ({ item, index }) => {
        //Price Calculate
        myPrice = myPrice + (item.price) ;
        setUpdateTotalAmount(Math.floor(myPrice))

        //Delivery
        let deliveryTime = item.deliveryTime;
        if (deliveryTime) {
            setDelivery("Free Delivery");
            
        }
        else{
            console.log('nott');
        }

        

    
        return (

            <ProductCart
                item={item}
                index={index}
                itemId={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                qty={item.qty}
                navigation={()=> navigation.navigate('Cart',{item:item})}
                addQty={() => addQty()}
                addQuantity={addQuantity}
                removeQuantity={removeQuantity}

            />
        );


    }

    return (
        
        <View style={Styles.mainContainer}>
            <SafeAreaView>
                    <View style={Styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={Styles.leftHeader}>
                                <Feather name='chevron-left' size={12} color={colors.textDark} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            <Text style={Styles.cartTitle}>Cart Item</Text>
            

                <View style={Styles.flexContainer}>
            <ScrollView>
            <FlatList
               data={cartData}
               renderItem={renderComponentItem}
               keyExtractor={item => item.id}
               ListEmptyComponent={
                <View
                  style={{
                    height: 500,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor:'red'
                  }}
                >
                  <Text
                    style={{
                    //   textAlign: "center",
                      fontSize: 24,
                      color: "#555",
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    Your cart is empty
                  </Text>
                </View>
              }
               

           />
           <View style={{height:200}}/>
           </ScrollView>
           
            </View>
           

            {cartData.length > 0 ?(
                <View style={{flex:1,width:'100%', backgroundColor:colors.secondary,position:'absolute',bottom:0,borderTopRightRadius:30,borderTopLeftRadius:30}}>
                <View style={{paddingHorizontal:30,marginTop:30,marginBottom:90,justifyContent:'center',flexDirection:'row' }}>
                    <View style={{alignItems:'flex-start',width:'50%'}}>
                        <Text style={{color:'white', }}>Sub Total</Text>
                        <Text style={{color:'white', }}>{`Discount(${DiscountPercent}%)`}</Text>
                        <Text style={{color:'white', }}>{`Tax(${TaxPercent}%)`}</Text>
                        <Text style={{color:'white', }}>Delivery Fee</Text>
                        <Text style={{color:'white', }}>{`Total Amount`}</Text>

                    </View>
                    <View style={{alignItems:'flex-end',width:'50%'}}>
                    <Text style={{color:'white', }}>{`${currency} ${updateTotalAmount}`}</Text>
                    <Text style={{color:'white', }}>{`${currency} ${updateTotalAmount * DiscountPercent / 100 }`}</Text>
                    <Text style={{color:'white', }}>{`${currency} ${updateTotalAmount * TaxPercent / 100 }`}</Text>
                    <Text style={{color:'white', }}>{`${delivery}`}</Text>
                    <Text style={{color:'white', }}>{`${currency} ${Math.floor(TotalAmount)}`}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} style={{paddingHorizontal:150,alignSelf:'center',height:50,backgroundColor:colors.background,alignItems:'center',justifyContent:'center',borderRadius:15,position:'absolute',bottom:20}}>
                <Text style={{color:colors.textDark,fontWeight:'bold',fontSize:15}}>
                    {`Checkout`}
                </Text>
                </TouchableOpacity>
            </View>
            ):(
                <View></View>
            )}

        </View>


    );
}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white

    },
    flexContainer:{
        // flex:1,
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

    container: {

        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent:'space-between',
        backgroundColor: '#fff',
        // marginHorizontal:25,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'

    },
    imageView: {
        justifyContent: 'center',
        width: 90,
        height: 90,

    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    textView: {
        justifyContent: 'center',
        marginLeft: 15,
        width:'80%'


    },
    title: {
        fontSize: 16,
        fontWeight: '400'

    },
    price: {
        fontSize: 15,
        color: 'red',
        // position:'absolute',
        // right:22,
        // top:26
    },
    cartTitle:{
        fontSize:30,
        marginHorizontal:30,
        marginVertical:15,
        fontFamily:'Montserrat-SemiBold'

    },
    quantityController:{
        position:'absolute',
        right:35,
        // top:1,
        alignItems:'center',
        flex:1,
        flexDirection:'row'
    },
    qtyPlus:{
        padding:3,
        borderWidth:1,
        borderColor:colors.textDark,
        marginLeft:28,
        borderRadius:6
    },
    qtyMinus:{
        padding:3,
        borderWidth:1,
        borderColor:colors.textDark,
        borderRadius:6
    },
    count:{
        marginLeft:10,
        marginRight:10,
    }
})