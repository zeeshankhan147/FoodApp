import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCart from './productCart';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import {useDispatch, useSelector } from "react-redux";
import { removeAllCart, removeCart, updateCart } from './Redux/Actions/CartAction';





export default AddToCart = ({ route, navigation }) => {
    let currency = 'Rs';
    let DiscountPercent = 50;
    let TaxPercent = 20;
    let deliveryFee = 50;
    // const [quantity, setQuantity] = useState(1)
    const [updateTotalAmount, setUpdateTotalAmount] = useState(0)
    const [discountTotalAmount, setDiscountTotalAmount] = useState(0)
    const [taxTotalAmount, setTaxTotalAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const isFocused = useIsFocused();
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();
    const  myCart = useSelector(state => state.cart.cartData)


    const clearCartItem = () =>{
        Alert.alert(
            "Clear All",
            "Do you want to clear all item from cart ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => dispatch(removeAllCart())
                },
            ],
            { cancelable: false }
        )


    }
 

    const deleteItem = (index) => {

        Alert.alert(
            "Delete Item",
            "Do you want to remove item from cart ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => del(index)
                },
            ],
            { cancelable: false }
        )
    }

    const del = (index) => {
        let data = [...myCart]
        data.splice(index,1)
        dispatch(removeCart(data))

    }



    const addQuantity = (price,index) => {
        let data = myCart;
        data[index].quantity = data[index].quantity + 1
        dispatch(updateCart(data))

        setUpdateTotalAmount(Math.round(updateTotalAmount + price))
        setDiscountTotalAmount(Math.round((updateTotalAmount + price) * DiscountPercent / 100))
        setTaxTotalAmount(Math.round((updateTotalAmount + price) * TaxPercent / 100))
        setTotalAmount(Math.round(((updateTotalAmount + price) * DiscountPercent / 100)
            + ((updateTotalAmount + price) * TaxPercent / 100)
            + deliveryFee));





    }
    const removeQuantity = (price,index)  => {
        let data = myCart;
        data[index].quantity = data[index].quantity - 1
        dispatch(updateCart(data))

        setUpdateTotalAmount(Math.round(updateTotalAmount - price))
        setDiscountTotalAmount(Math.round((updateTotalAmount - price) * DiscountPercent / 100))
        setTaxTotalAmount(Math.round((updateTotalAmount - price) * TaxPercent / 100))
        setTotalAmount(Math.round(((updateTotalAmount - price) * DiscountPercent / 100)
            + ((updateTotalAmount - price) * TaxPercent / 100)
            + deliveryFee));



    }

    function updateAmount(item) {
        let subTotal = 0;
        let discountTotal = 0;
        let taxTotal = 0;
        let grandTotal = 0;
        item.map((i) => {
            subTotal += i.price * i.quantity;
            discountTotal += ((i.price * DiscountPercent / 100)* i.quantity);
            taxTotal += ((i.price * TaxPercent / 100)* i.quantity);

        })
        grandTotal = discountTotal + taxTotal;
        setUpdateTotalAmount(Math.round(subTotal))
        setDiscountTotalAmount(Math.round(subTotal * DiscountPercent / 100))
        setTaxTotalAmount(Math.round(subTotal * TaxPercent / 100))
        setTotalAmount(Math.round(grandTotal + deliveryFee));


    }


    useEffect(() => {
      
        // Will Unmount //
        return () => {

        }

    }, [isFocused])


    const renderComponentItem = ({ item, index }) => {
        return (
            <ProductCart
                item={item}
                addons={item.addons}
                index={index}
                itemId={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                qty={item.quantity}
                navigation={() => navigation.navigate('DetailView', { item: item })}
                addQuantity={addQuantity}
                removeQuantity={removeQuantity}
                deleteItem={deleteItem}
            // updateAmount={updateAmount}

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
                    
                   {myCart.length > 0 ?(
                     <TouchableOpacity onPress={() =>  clearCartItem()}>
                     <View style={Styles.rightHeader}>
                         <Feather name='trash' size={16} color={colors.price} />
                     </View>
                 </TouchableOpacity>
                   ):(null)}


                </View>
            </SafeAreaView>

            <Text style={Styles.cartTitle}>Cart Item</Text>

            <ScrollView style={Styles.flexContainer} contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
                <FlatList
                    data={myCart}
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
                                    fontSize: 20,
                                    color: "#c5c5c5",
                                    fontFamily: "Poppins-Regular",
                                }}
                            >
                                Your cart is empty
                            </Text>
                        </View>
                    }


                />
                <View style={{ height: 200 }} />
            </ScrollView>




            {myCart.length > 0 ? (
                <View style={Styles.modal}>

                    <View style={{ paddingHorizontal: 30, marginTop: 30, marginBottom: 90, justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={{ color: 'white', }}>Sub Total</Text>
                            <Text style={{ color: 'white', }}>{`Discount(${DiscountPercent}%)`}</Text>
                            <Text style={{ color: 'white', }}>{`Tax(${TaxPercent}%)`}</Text>
                            <Text style={{ color: 'white', }}>Delivery Fee</Text>
                            <Text style={{ color: 'white', }}>{`Total Amount`}</Text>

                        </View>
                        <View style={{ alignItems: 'flex-end', width: '50%' }}>
                            <Text style={{ color: 'white', }}>{`${currency} ${Math.floor(updateTotalAmount)}`}</Text>
                            <Text style={{ color: 'white', }}>{`${currency} ${discountTotalAmount}`}</Text>
                            <Text style={{ color: 'white', }}>{`${currency} ${taxTotalAmount}`}</Text>
                            <Text style={{ color: 'white', }}>{`${currency} ${deliveryFee}`}</Text>
                            <Text style={{ color: 'white', }}>{`${currency} ${Math.floor(totalAmount)}`}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ paddingHorizontal: 110, alignSelf: 'center', height: 50, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', borderRadius: 15, position: 'absolute', bottom: 20 }}>
                        <Text style={{ color: colors.textDark, fontWeight: 'bold', fontSize: 15 }}>
                            {`Place Order ${currency} - (${totalAmount})`}
                        </Text>
                        {/* <Feather style={{alignSelf:'flex-end'}} name='chevron-right' size={20} color={colors.secondary} /> */}

                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}

        </View>


    );
}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#eee'

    },
    flexContainer: {
        flex: 1,
        marginBottom: 20,
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
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#CDCDCD',
        borderWidth: 2,

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
        width: '80%'


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
    cartTitle: {
        fontSize: 30,
        marginHorizontal: 30,
        marginVertical: 15,
        fontFamily: 'Montserrat-SemiBold'

    },
    quantityController: {
        position: 'absolute',
        right: 35,
        // top:1,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    qtyPlus: {
        padding: 3,
        borderWidth: 1,
        borderColor: colors.textDark,
        marginLeft: 28,
        borderRadius: 6
    },
    qtyMinus: {
        padding: 3,
        borderWidth: 1,
        borderColor: colors.textDark,
        borderRadius: 6
    },
    count: {
        marginLeft: 10,
        marginRight: 10,
    },
    modal: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        // shadowColor: colors.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.05,
        // shadowRadius: 20,
        // elevation: 10,
        // overflow: 'hidden',

    },

})