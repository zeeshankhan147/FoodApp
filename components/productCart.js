import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_ADDTO_CART, _UPDATE_CART} from './Redux/Actions/CartAction';
import {useDispatch, useSelector } from "react-redux";
import { SwipeListView } from 'react-native-swipe-list-view';


export default ProductCard = (props) => {
    const {
        index,
        itemId,
        image,
        title,
        price,
        addons,
        minusQty,
        qty,
        item,
        navigation,
        lenght,
        addQuantity,
        removeQuantity,
        updateAmount,
        deleteItem,
        from,
        addHome,
        removeHome,
    } = props;
    const [qtyPlus, setQtyPlus] = useState(qty)
    const [quick, setQuick] = useState(false)
    const dispatch = useDispatch();
    const  myCart = useSelector(state => state.cart.cartData)

    const AddCart = (item) =>{
        let data = {
            cart: item,
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: qtyPlus
        }
        dispatch(_ADDTO_CART(data)) 
        setQuick(true)

    }

    const homeAddQty = async (itemIndex) => {
        setQtyPlus(qtyPlus + 1)
        addHome(qtyPlus + 1)
        // AsyncStorage.getItem('@cartItem').then((val) => {
        //    let data = JSON.parse(val)
        //     data[itemIndex].quantity = data[itemIndex].quantity + 1
        //     _UPDATE_CART(data,itemIndex)

        // })
        let cartData = myCart;
        cartData[index].quantity = cartData[index].quantity + 1
        await dispatch(_UPDATE_CART(cartData))

        

    }

    const homeRemoveQty = async (itemIndex) => {
        setQtyPlus(qtyPlus - 1)
        addHome(qtyPlus - 1)
        // AsyncStorage.getItem('@cartItem').then((val) => {
        //     let data = JSON.parse(val)
        //     data[itemIndex].quantity = data[itemIndex].quantity - 1
        //     _UPDATE_CART(data,itemIndex)

        // })
        let cartData = myCart;
        cartData[index].quantity = cartData[index].quantity*1 - 1
        await dispatch(_UPDATE_CART(cartData))
    }

    const adding = async (price,itemIndex) => {
        setQtyPlus(qtyPlus + 1)
        from != 'home' ? addQuantity(price, qtyPlus + 1) : null
        // AsyncStorage.getItem('@cartItem').then((val) => {
        //     let data = JSON.parse(val)
        //         data[itemIndex].quantity = data[itemIndex].quantity + 1
        //         _UPDATE_CART(data)
        // })
        let cartData = myCart;
        cartData[index].quantity = cartData[index].quantity + 1
        await dispatch(_UPDATE_CART(cartData))
    }
    const minus = async (price,itemIndex) => {
        setQtyPlus(qtyPlus - 1)
        from != 'home' ? addQuantity(price, qtyPlus - 1) : null
        // AsyncStorage.getItem('@cartItem').then((val) => {
        //     let data = JSON.parse(val)
        //         data[itemIndex].quantity = data[itemIndex].quantity - 1
        //         _UPDATE_CART(data)
        // })
        let cartData = myCart;
        cartData[index].quantity = cartData[index].quantity - 1
        await dispatch(_UPDATE_CART(cartData))
    }
    const itemDel = (index) => {
        deleteItem(index)
        if (from == "home") {
            AsyncStorage.getItem('@cartItem').then((val) => {
                const data = JSON.parse(val)
                data.splice(index, 1)
            })
            setQuick(false)
        }


    }



    return (

        <View>
            {from == "home" ? (
                <View style={{ marginBottom: 10, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.textLight, paddingBottom: 8 }}>
                    <View style={{ width: 100, alignItems: 'center' }}>
                        {/* <Text>Category here</Text> */}
                        <Image source={item.image}
                            style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: 'white' }}
                        />
                        {quick == true ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 8,

                                }}>

                                <TouchableOpacity onPress={() => { qtyPlus > 1 ? homeRemoveQty(index) : itemDel(index) }}
                                    style={{ backgroundColor: colors.background, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                    <MaterialCommunityIcons name="minus" size={17} color={colors.white}
                                    />
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: 15, color: colors.textLight }}>{qtyPlus}</Text>

                                <TouchableOpacity onPress={() => homeAddQty(index)}
                                    style={{ backgroundColor: colors.background, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                    <MaterialCommunityIcons name="plus" size={17} color={colors.white}
                                    />
                                </TouchableOpacity>

                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => AddCart(item)}
                                style={{
                                    flexDirection: 'row', backgroundColor: colors.background, paddingHorizontal: 15,
                                    borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 8, paddingVertical: 3

                                }}>
                                <MaterialCommunityIcons name="cart" size={17} color={colors.white} />
                                <Text style={{ marginLeft: 3, color: colors.white }}>ADD</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailView', { item: item })} style={{ width: 300, }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}>{item.title}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 6 }}>{item.description}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', marginTop: 6 }}>Rs. {item.price}</Text>

                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity 
                onLongPress={() => {
                    itemDel(index)
                }}
                    delayLongPress={1000}
                    activeOpacity={0.8}
                    style={Styles.container}>
                        
                    <TouchableOpacity style={Styles.imageView} key={itemId} onPress={() => navigation()}>
                        <Image style={Styles.image} source={image} />
                    </TouchableOpacity>

                    <View style={Styles.textView}>

                        <Text style={Styles.title}>{title}</Text>
                        {addons && addons.map((item,index)=>{
                            return <Text style={Styles.addon}>{`(${index +1}) ${item.name}`}</Text>
                               
                            
                        })}
                        <Text style={Styles.price}>Rs.{Math.round(price) * qtyPlus}</Text>

                        <View style={Styles.quantityController}>
                            <TouchableOpacity style={Styles.qtyPlus} onPress={() => adding(price,index)}>
                                <Feather name='plus' size={12} color={colors.secondary} />
                            </TouchableOpacity>
                            <Text style={Styles.count} >{qtyPlus}</Text>
                            <TouchableOpacity style={[Styles.qtyMinus,
                            {
                                backgroundColor: qtyPlus > 1 ? colors.white : colors.textLight,
                                borderColor: qtyPlus > 1 ? colors.primary : colors.textLight

                            }]} key={index} onPress={() => { qtyPlus > 1 ? minus(price,index) : itemDel(index) }}>
                                <Feather name={qtyPlus > 1 ? 'minus' : 'trash'} size={12} color={qtyPlus > 1 ? colors.primary : colors.white} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </TouchableOpacity>
            )}
        </View>






    );

}
const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white

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
        marginHorizontal:25,
        paddingVertical:10,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 10,
        // borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        borderRadius:10,
        shadowOffset:{
            width:0,
            height:5
        },
        elevation:4,
        marginBottom:10,


    },
    imageView: {
        justifyContent: 'center',
        alignItems:'center',
        width: 80,
        height: 70,
        borderColor:'grey',
        borderWidth:0.3,
        // backgroundColor:'red',
        borderRadius:10,
        
        

    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    textView: {
        justifyContent: 'center',
        marginLeft: 15,
        width: '80%'


    },
    title: {
        fontSize: 12,
        fontWeight: '600'

    },
    addon: {
        fontSize: 10,
        color: Colors.textLight,
        fontWeight: '400',
        width:'60%',
        // position:'absolute',
        // right:22,
        // top:26
    },
    price: {
        fontSize: 10,
        color: Colors.textDark,
        fontWeight: '800'
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
        borderWidth: 1.5,
        borderColor: colors.secondary,
        backgroundColor: colors.white,
        marginLeft: 28,
        borderRadius: 6
    },
    qtyMinus: {
        padding: 3,
        borderWidth: 1.5,
        // borderColor: colors.secondary,
        // backgroundColor:colors.white,
        borderRadius: 6
    },
    count: {
        marginLeft: 10,
        marginRight: 10,
    }
})