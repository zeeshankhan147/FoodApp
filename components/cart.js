import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView, Alert, ToastAndroid } from 'react-native';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

const Cart = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    
    const { item } = route.params;
    const [counter, setCounter] = useState(0);

    
    function countify (){
        AsyncStorage.getItem('@cartItem').then((ct)=>{
            if (ct != null) {
                const CNTER = JSON.parse(ct);
                let dt = Object.keys(CNTER).length;
                setCounter(dt)
                
                
            }
            else{
                console.log('nullllla');
            }
        })
    }
    
    useEffect(()=>{
        countify();
        
    },[isFocused])


    // ADD TO CART FUNCTION //
    const add_to_cart = async (item) => {
        const datarray = [];
        datarray.push(item);
   
        await AsyncStorage.getItem('@cartItem').then((valo) => {
            const data = JSON.parse(valo)
            if (data != null) {
                data.forEach(element => {
                    if (element.id != item.id) {
                        datarray.push(element)
                        setCounter(datarray.length)
                        // ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);

                        
                    }
                    else{
                        ToastAndroid.show(`Warning this item is already in your cart`, ToastAndroid.LONG);
                    }
                    
                });
                
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('next time run', JSON.stringify(datarray));
                
                {navigation.navigate('Home')}
                


            }
            else {
                AsyncStorage.setItem('@cartItem', JSON.stringify(datarray))
                console.log('1st time', JSON.stringify(datarray));
                ToastAndroid.show("Add in cart this item", ToastAndroid.SHORT);
                setCounter(datarray.length)
                {navigation.navigate('Home')}


            }

        })
     
    }
    
    const renderIngredientItem = ({ item }) => {

        return (
            <View style={[styles.ingredientImage,
            {
                marginLeft: item.id == 1 ? 30 : 0
            }
            ]}>

                <Image source={item.image} />
            </View>

        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={styles.leftHeader}>
                                <Feather name='chevron-left' size={12} color={colors.textDark} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('AddToCart')}>
                        {counter > 0 ? (
                            <View style={{position:'absolute',top:-8,right:-8, backgroundColor:colors.background,width:20,height:20,borderRadius:20,alignItems:'center',justifyContent:'center' }}>
                            <Text style={{color:colors.textDark,fontWeight:'600'}}>
                               {counter}
                            </Text>
                        </View>
                        ):(
                            <View></View>
                        )}
                            <MaterialCommunityIcons name='shopping' size={22} color={colors.white} />
                            
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* title */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>

                {/* price */}
                <View style={styles.priceWrapper}>
                    <Text style={styles.price}>${item.price}</Text>
                </View>

                {/* size */}
                <View style={styles.sizeWrapper}>
                    <Text style={styles.sizeText}>Size</Text>
                    <Text style={styles.sizeProperty}>{item.sizeName} {item.sizeNumber}"</Text>
                </View>

                {/* crust */}
                <View style={styles.crustWrapper}>
                    <Text style={styles.crustText}>Crust</Text>
                    <Text style={styles.crustProperty}>{item.crust}</Text>
                </View>

                {/* delivery Time */}
                <View style={styles.deliveryTimeWrapper}>
                    <Text style={styles.deliveryTimeText}>Delivery in</Text>
                    <Text style={styles.deliveryTimeProperty}>{item.deliveryTime} Min Approx</Text>
                </View>

                {/* Image */}
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={item.image} />
                </View>

                {/* ingredient */}
                <View style={styles.ingredientWrapper}>
                    <Text style={styles.ingredientText}>Ingredients</Text>
                    <View style={styles.ingredientList}>
                        <FlatList
                            data={item.ingredient}
                            renderItem={renderIngredientItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                        />
                    </View>
                </View>


                {/* Order button */}
                <TouchableOpacity key={item.id} onPress={() => add_to_cart(item)}>
                    <View style={styles.orderBtn} >
                        <View style={styles.btnWrapper}>
                            <Text style={styles.orderBtnText}>Add to Cart</Text>
                            <Feather style={styles.orderBtnIcon} name='shopping-cart' size={20} color={colors.textDark} />
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>

    );
}
export default Cart;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    titleWrapper: {
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        color: colors.textDark,
        fontSize: 32,
        marginTop: 30,
        width: '80%',
    },
    priceWrapper: {
        marginTop: 20,
        paddingHorizontal: 30,
    },
    price: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.secondary,

    },
    sizeWrapper: {
        paddingHorizontal: 30,
        marginTop: 30,
    },
    sizeText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: colors.textLight,
    },
    sizeProperty: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: colors.textDark,
        marginTop: 5,

    },
    crustWrapper: {
        paddingHorizontal: 30,
        marginTop: 20,
    },
    crustText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: colors.textLight,
    },
    crustProperty: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: colors.textDark,
        marginTop: 5,
    },
    deliveryTimeWrapper: {
        paddingHorizontal: 30,
        marginTop: 20,
    },
    deliveryTimeText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: colors.textLight,
    },
    deliveryTimeProperty: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: colors.textDark,
        marginTop: 5,
    },
    imageWrapper: {
        marginLeft: 160,
        marginTop: 285,
        position: 'absolute',
        resizeMode: 'content',
    },
    ingredientWrapper: {
        // paddingHorizontal:30,
        marginTop: 60,
    },
    ingredientText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark,
        marginLeft: 30,

    },
    ingredientList: {
        marginTop: 19,

    },
    ingredientImage: {
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 15,

    },
    orderBtn: {
        backgroundColor: colors.primary,
        marginHorizontal: 30,
        marginTop: 23,
        borderRadius: 10,
        paddingVertical: 18,
        // bottom:0,





    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },

    orderBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark,



    },
    orderBtnIcon: {
        alignItems: 'center',
        marginLeft: 6,
        marginTop: 4,

    },


});