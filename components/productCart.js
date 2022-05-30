import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default ProductCard = (props) => {
    const {
        index,
        itemId,
        image,
        title,
        price,
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
    
    const add_to_cart = async (item) => {
        const datarray = [];
        let cartDataObj = {
            data:item,
            id:itemId,
            title:title,
            price:price,
            image:image,
            quantity:qtyPlus
        };
        datarray.push(cartDataObj)

        await AsyncStorage.getItem('@cartItem').then((valo) => {
            const data = JSON.parse(valo)
            if (data != null) {
                data.forEach(element => {
                    if (element.id != item.id) {
                        let cartDataObj = {
                            data:element,
                            id:element.id,
                            title:element.title,
                            price:element.price,
                            image:element.image,
                            quantity:element.quantity
                        };
                        datarray.push(cartDataObj)
                        setQuick(true)
                        // setCounter(datarray.length)
                        // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);

                        
                    }
                    else{
                        ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
                    }
                    
                });
                
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('next time run', JSON.stringify(datarray));
                
                
            }
            else {
                setQuick(true)
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('1st time', JSON.stringify(datarray));
                ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);
                // setCounter(datarray.length)
               


            }

        })
        
        

        

    }
    
    const homeAddQty = async (item) =>{
        setQtyPlus(qtyPlus + 1)
        // addQuantity(price,qtyPlus + 1)
        addHome(qtyPlus + 1)
        await AsyncStorage.getItem('@cartItem').then((val)=>{
            const data = JSON.parse(val)
            if (data != null) {
                data.map((itemId,index)=>{
                    console.warn(itemId.id);
                    if (itemId.id == item.id) {
                        data.splice(index,1)
                        AsyncStorage.setItem('@cartItem',JSON.stringify(data))
                        
                    }
                })
                
            }
        })

        const datarray = [];
        let cartDataObj = {
            data:item,
            id:itemId,
            title:title,
            price:price,
            image:image,
            quantity:qtyPlus + 1 
        };
        datarray.push(cartDataObj)

          AsyncStorage.getItem('@cartItem').then((valo) => {
            const data = JSON.parse(valo)
            if (data != null) {
                data.forEach(element => {
                    if (element.id != item.id) {
                        let cartDataObj = {
                            data:element,
                            id:element.id,
                            title:element.title,
                            price:element.price,
                            image:element.image,
                            quantity:element.quantity
                        };
                        datarray.push(cartDataObj)
                        // setCounter(datarray.length)
                        // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);

                        
                    }
                    else{
                        ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
                    }
                    
                });
                
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('next time run', JSON.stringify(datarray));
                
                
            }
            else {
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('1st time', JSON.stringify(datarray));
                ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);
                // setCounter(datarray.length)
               


            }

        })

    }

    const homeRemoveQty = async (item) =>{
        setQtyPlus(qtyPlus - 1)
        // addQuantity(price,qtyPlus - 1)
        removeHome(qtyPlus - 1)
       await AsyncStorage.getItem('@cartItem').then((val)=>{
            const data = JSON.parse(val)
            if (data != null) {
                data.map((itemId,index)=>{
                    console.warn(itemId.id);
                    if (itemId.id == item.id) {
                        data.splice(index,1)
                        AsyncStorage.setItem('@cartItem',JSON.stringify(data))
                        
                    }
                })
                
            }
        })

        const datarray = [];
        let cartDataObj = {
            data:item,
            id:itemId,
            title:title,
            price:price,
            image:image,
            quantity:qtyPlus - 1 
        };
        datarray.push(cartDataObj)

         AsyncStorage.getItem('@cartItem').then((valo) => {
            const data = JSON.parse(valo)
            if (data != null) {
                data.forEach(element => {
                    if (element.id != item.id) {
                        let cartDataObj = {
                            data:element,
                            id:element.id,
                            title:element.title,
                            price:element.price,
                            image:element.image,
                            quantity:element.quantity
                        };
                        datarray.push(cartDataObj)
                        // setCounter(datarray.length)
                        // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);

                        
                    }
                    else{
                        ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
                    }
                    
                });
                
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('next time run', JSON.stringify(datarray));
                
                
            }
            else {
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('1st time', JSON.stringify(datarray));
                ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);
                // setCounter(datarray.length)
               


            }

        })
        

    }


    const adding =  (price,i) => {
        setQtyPlus(qtyPlus + 1)
        addQuantity(price,qtyPlus + 1)    
       
    }
    const minus = async (price,i) => {
        setQtyPlus(qtyPlus - 1)
        removeQuantity(price)
        
    }
    const itemDel = (index) => {
        deleteItem(index)
        if (from == "home") {
             AsyncStorage.getItem('@cartItem').then((val)=>{
                const data = JSON.parse(val)
                data.splice(index,1)
            })
        }
        setQuick(false)

    }



    return (

        <View>
            {from == "home" ? (
                <TouchableOpacity onPress={() => navigation.navigate('Cart', { item: item })}
                    style={{ marginBottom: 10, flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.textLight, paddingBottom: 8 }}>
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

                                <TouchableOpacity onPress={() => { qtyPlus > 1 ? homeRemoveQty(item) : itemDel(index) }}
                                style={{ backgroundColor: colors.background, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                    <MaterialCommunityIcons name="minus" size={17} color={colors.white}
                                    />
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: 15, color: colors.textLight }}>{qtyPlus}</Text>

                                <TouchableOpacity onPress={() => homeAddQty(item)}
                                style={{ backgroundColor: colors.background, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 4 }}>
                                    <MaterialCommunityIcons name="plus" size={17} color={colors.white}
                                    />
                                </TouchableOpacity>

                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => add_to_cart(item)}
                                style={{
                                    flexDirection: 'row', backgroundColor: colors.background, paddingHorizontal: 15,
                                    borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 8, paddingVertical: 3

                                }}>
                                <MaterialCommunityIcons name="cart" size={17} color={colors.white} />
                                <Text style={{ marginLeft: 3, color: colors.white }}>ADD</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ width: 220, }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}>{item.title}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 6 }}>{item.description}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', marginTop: 6 }}>Rs. {item.price}</Text>

                    </View>
                </TouchableOpacity>
            ) : (
                <View style={Styles.container}>

                    <TouchableOpacity style={Styles.imageView} key={itemId} onPress={() => navigation()}>
                        <Image style={Styles.image} source={image} />
                    </TouchableOpacity>

                    <View style={Styles.textView}>

                        <Text style={Styles.title}>{title}</Text>
                        <Text style={Styles.price}>Rs.{Math.round(price) * qtyPlus}</Text>

                        <View style={Styles.quantityController}>
                            <TouchableOpacity style={Styles.qtyPlus} onPress={() => adding(price)}>
                                <Feather name='plus' size={12} color={colors.secondary} />
                            </TouchableOpacity>
                            <Text style={Styles.count} >{qtyPlus}</Text>
                            <TouchableOpacity style={[Styles.qtyMinus,
                            {
                                backgroundColor: qtyPlus > 1 ? colors.white : colors.textLight,
                                borderColor: qtyPlus > 1 ? colors.primary : colors.textLight

                            }]} key={index} onPress={() => { qtyPlus > 1 ? minus(price) : itemDel(index) }}>
                                <Feather name={qtyPlus > 1 ? 'minus' : 'trash'} size={12} color={qtyPlus > 1 ? colors.primary : colors.white} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
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
        // marginHorizontal:25,
        // marginTop:20,
        // borderRadius:20,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',


    },
    imageView: {
        justifyContent: 'center',
        width: 80,
        height: 70,

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
        fontSize: 12,
        fontWeight: '400'

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