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
import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { addToCartAction } from './Redux/Actions/CartAction';
import { useDispatch, useSelector } from "react-redux";
import Data from '../assets/images/pizza';


const AnimatedCard = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const [qtyPlus, setQtyPlus] = useState(1)

    const { item } = route.params;
    const [counter, setCounter] = useState(0);
    const [addons, setAddons] = useState([])
    const dispatch = useDispatch();
    const myCart = useSelector(state => state.cart.cartData)
    const { width: windowWidth } = useWindowDimensions();

    const [scale, setScale] = useState(300)
    const spinValue = new Animated.Value(0);


    useEffect(() => {
   
        return () => {
            setAddons([])
        }

    }, [isFocused])

    const sizeChanger = (size) => {
        if (size == 'small') {

            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.bounce, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance


                }).start()


        }
        else if (size == 'medium') {

            Animated.timing(
                spinValue,
                {
                    toValue: 2,
                    duration: 1000,
                    easing: Easing.bounce, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance

                }).start()
        }
        else {
            Animated.timing(
                spinValue,
                {
                    toValue: 3,
                    duration: 1000,
                    easing: Easing.bounce, // Easing is an additional import from react-native
                    useNativeDriver: true  // To make use of native driver for performance

                }).start()


        }

    }


    const AddCart = (item) => {
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
        }, 1000);

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

    const renderProduct = ({ item, index }) => {

        const spin = spinValue.interpolate({
            inputRange: [0, 1,],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View
                style={{ width: windowWidth, height: 450, justifyContent: 'center', alignItems: 'center' }}
                key={index}>
                <View style={{ position: 'absolute', top: 30 }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '800',
                        color: 'red'
                    }}>{item.title}</Text>
                </View>

                <Animated.Image
                    key={index}
                    style={{ width: 300, height: 300, transform: [{ rotate: spin }] }}
                    source={item.image}
                />


            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                width: windowWidth, height: 450, backgroundColor: 'yellow', borderBottomRightRadius: 200, borderBottomLeftRadius: 200,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <FlatList
                    data={Data}
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
                marginTop: 80
            }}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => sizeChanger('small')}
                >
                    <Text style={styles.btnText} >Small</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}
                    onPress={() => sizeChanger('medium')}
                >
                    <Text style={styles.btnText}>Medium</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}
                    onPress={() => sizeChanger('large')}
                >
                    <Text style={styles.btnText}>Large</Text>
                </TouchableOpacity>

            </View>

        </View>

    );
}
export default AnimatedCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    },
    btn: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: 'red',
        marginHorizontal: 5
    }



});