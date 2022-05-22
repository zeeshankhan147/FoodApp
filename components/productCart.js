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
    } = props;

    const [qtyPlus, setQtyPlus] = useState(1)

    const adding = (price) => {
        setQtyPlus(qtyPlus + 1)
        // updateAmount()
        addQuantity(price)
    }
    const minus = (price) => {
        setQtyPlus(qtyPlus - 1)
        removeQuantity(price)
        // updateAmount()
    }
    const itemDel = (index) => {
        deleteItem(index)
    }



    return (

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