import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    Alert,
    ToastAndroid,
    useWindowDimensions,
    Animated,
    Easing
} from 'react-native';
import CircleList from 'react-native-circle-list'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { addToCartAction } from './Redux/Actions/CartAction';
import { useDispatch, useSelector } from "react-redux";
import Data from '../assets/images/pizza';
import AddOns from '../assets/data/add-ons';


const AnimatedCard = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [qtyPlus, setQtyPlus] = useState(1)

    const { item } = route.params;
    const [counter, setCounter] = useState(0);
    const [size, setSize] = useState('medium');
    const [textAnim, setTextAnim] = useState(true);
    const [iconAnim, setIconAnim] = useState(false);
    const [addons, setAddons] = useState([])
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData)
    const { width: windowWidth } = useWindowDimensions();

    const spinValue = new Animated.Value(0);
    const scale = new Animated.Value(1.4)
    const leafScale = new Animated.Value(1.1)
    const leafRotation = new Animated.Value(0)
    const widthAnim = new Animated.Value(200)



    useEffect(() => {
        return () => {
            setAddons([])
            setTextAnim(true)
            setIconAnim(false)
        }

    }, [isFocused])

    const sizeChanger = (size) => {
        if (size == 'small') {
            Animated.spring(spinValue, { toValue: 1, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start()
            Animated.spring(scale, { toValue: 1.1, useNativeDriver: false, duration: 1000 }).start()
            Animated.timing(leafScale, { toValue: 0.9, useNativeDriver: false, easing: null, }).start()
            Animated.timing(leafRotation, { toValue: 1, duration: 1000, useNativeDriver: false }).start()
        }
        else if (size == 'medium') {
            Animated.spring(spinValue, { toValue: 2, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start()
            Animated.spring(scale, { toValue: 1.3, useNativeDriver: false, duration: 1000 }).start()
            Animated.spring(leafScale, { toValue: 1, useNativeDriver: false }).start()
            Animated.timing(leafRotation, { toValue: 2, duration: 1000, useNativeDriver: false }).start()
        }
        else {
            Animated.spring(spinValue, { toValue: 3, duration: 1000, easing: Easing.bounce, useNativeDriver: false }).start()
            Animated.spring(scale, { toValue: 1.5, useNativeDriver: false, duration: 1000 }).start()
            Animated.spring(leafScale, { toValue: 1.1, useNativeDriver: false }).start()
            Animated.timing(leafRotation, { toValue: 3, duration: 1000, useNativeDriver: false }).start()
        }
        // setTimeout(() => {
        //     setSize(size)
        // }, 600);


    }
    const animationWidth = () => {
        Animated.timing(widthAnim, { toValue: 50, duration: 500, useNativeDriver: false }).start()
    }
    const resetAnim = () => {
        Animated.timing(widthAnim, { toValue: 200, duration: 200, useNativeDriver: true }).start()
    }

    const AddCart = (item) => {

        // animationWidth()
        // setTimeout(() => {
        //     setTextAnim(false)


        // }, 500);
        let data = {
            addons: addons,
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: qtyPlus
        }
        dispatch(addToCartAction(data))
        setTimeout(() => {
            navigation.navigate('Home')
        }, 600);

    }
    const addAddon = (item) => {
        let addonsArray = [];
        addonsArray.push(item)
        if (addons) {
            addons.map((addonItem) => {
                addonsArray.push(addonItem)
            })
        }
        setAddons(addonsArray)
    }

    const removeAddons = (id) => {
        let tempAddons = [...addons];
        let index = tempAddons.map(function (item) { return item.id; }).indexOf(id.id);
        tempAddons.splice(index, 1)
        setAddons(tempAddons)
    }

    const renderAddons = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.4} onPress={() => addons.includes(item) ? removeAddons(item, index) : addAddon(item)}
                style={{ marginHorizontal: 20, padding: 10 }}>
                <View style={[
                    {
                        backgroundColor: addons.includes(item) ? colors.primary : '#fff',
                        opacity: addons.includes(item) ? 0.5 : 1,
                        width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
                        borderRadius: 60,
                        elevation: 10,
                        shadowColor: '#b8b8b8f5',
                    }
                ]}>
                    <Image
                        style={[
                            {
                                width: 40, height: 40, borderRadius: 40,
                                backgroundColor: addons.includes(item) ? colors.primary : '#fff',
                            }
                        ]}
                        source={item.image} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderProduct = ({ item, index }) => {

        const spin = spinValue.interpolate({
            inputRange: [0, 1,],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View
                style={{ width: windowWidth, height: 450, justifyContent: 'center', alignItems: 'center' }}
                key={index}>
                <View style={{ position: 'absolute', top: 20 }}>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: '800',
                        color: colors.primary
                    }}>{item.title}</Text>
                </View>

                <Animated.Image
                    key={index}
                    style={{ width: 200, height: 200, transform: [{ rotate: spin }, { scale }] }}
                    source={item.image}
                />


            </View>
        )
    }

    return (

        <View style={styles.container}>
            {/* <View style={{ width: 800, height: 800, backgroundColor: 'orange', borderRadius: 800, top: -400, alignSelf: 'center', zIndex: -100, position: 'absolute' }} /> */}


            {/* <View style={{ width: 300, height: 300, borderColor: '#fff', borderWidth: 1, borderRadius: 300, alignSelf: 'center', position: 'absolute', marginTop: 76 }} /> */}

            {/* <View style={{ width: 30, height: 30, borderRadius: 30, backgroundColor: '#fff', position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 200, left: 50 }}>
                <MaterialCommunityIcons name='plus' size={22} />
            </View>
            <View style={{ width: 30, height: 30, borderRadius: 30, backgroundColor: '#fff', position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 200, right: 50 }}>
                <MaterialCommunityIcons name='minus' size={22} />
            </View> */}


            <View style={{ position: 'absolute', width: '100%', top: 76 }}>
                <Image
                    style={{ width: 300, height: 300, alignSelf: 'center' }}
                    source={require('../assets/images/wooden.png')} />
            </View>

            {/* <Animated.Image

                style={{
                    width: '100%', height: 400, position: 'absolute', alignSelf: 'center', zIndex: -100,
                    transform: [
                        {
                            rotate: leafRotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['60deg', '0deg']
                            })
                        }, { scale: leafScale }
                    ]
                }}
                source={require('../assets/images/leaf.png')}
            /> */}

            <View style={{
                width: windowWidth, height: 400,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <FlatList
                    data={item.flavor}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id}
                    pagingEnabled
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior='automatic'
                />
            </View>

            <View style={{
                width: windowWidth, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
                marginTop: 5
            }}>
                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('small')}
                >
                    <Text style={[styles.btnText, { color: size == 'small' ? '#717171f5' : '#b4b4b4f5', }]} >S</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('medium')}
                >
                    <Text style={[styles.btnText, { color: size == 'medium' ? '#717171f5' : '#b4b4b4f5' }]}>M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, {}]}
                    onPress={() => sizeChanger('large')}
                >
                    <Text style={[styles.btnText, { color: size == 'large' ? '#717171f5' : '#b4b4b4f5' }]}>L</Text>
                </TouchableOpacity>

            </View>

            {/* PRICE SECTION */}
            <View style={{
                width: windowWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                marginTop: 40,
            }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'baseline', borderColor: '#000', borderWidth: 0.5,
                    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 5
                }}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='minus' size={20} style={{ paddingRight: 10, borderRightColor: '#000', borderRightWidth: 0.4, marginRight: 15 }} />
                    </TouchableOpacity>

                    {/* <Text style={{ fontSize: 20, fontWeight: '800' }}>Price </Text> */}
                    <Animated.View>
                        <Text style={{ fontWeight: '500', fontSize: 20, }}>{`Rs 580`}</Text>
                    </Animated.View>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='plus' size={20} style={{ paddingLeft: 10, borderLeftColor: '#000', borderLeftWidth: 0.4, marginLeft: 15 }} />
                    </TouchableOpacity>
                </View>

            </View>

            {/*PIZZA TOPING ANIMATION VIEW */}
            <View
                style={{ marginTop: 40 }}>
                <CircleList
                    data={item.ingredient}
                    keyExtractor={item => parseInt(item.id)}
                    renderItem={renderAddons}
                    swipeSpeedMultiplier={20}
                    selectedItemScale={1.5}
                    radius={windowWidth / 2}
                />
            </View>

            {/* ADD TO CART BUTTON */}
            <View
                style={{ width: '100%', paddingVertical: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 10 }}
            >
                <TouchableOpacity onPress={AddCart} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Animated.View
                        style={{
                            backgroundColor: colors.primary,
                            width: widthAnim,
                            paddingVertical: 10,
                            borderRadius: 50,
                        }}
                    >
                        {textAnim ?
                            <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>
                                ADD TO CART
                            </Text> :
                            <MaterialCommunityIcons name='check' size={20} color="#fff" style={{ alignSelf: 'center' }} />
                        }


                    </Animated.View>

                </TouchableOpacity>

            </View>


        </View>

    );
}
export default AnimatedCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    btn: {
        width: 60,
        height: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 19,
        shadowColor: '#959595f5'

    }



});