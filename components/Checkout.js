import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import colors from "../assets/colors/colors";
import Feather from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";



const Checkout = ({ navigation }) => {
    let currency = 'Rs';
    let DiscountPercent = 50;
    let TaxPercent = 20;
    let deliveryFee = 50;

    const [updateTotalAmount, setUpdateTotalAmount] = useState(0)
    const [discountTotalAmount, setDiscountTotalAmount] = useState(0)
    const [taxTotalAmount, setTaxTotalAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const isFocused = useIsFocused();
    const myCart = useSelector(state => state.cart.cartData)

    function updateAmount() {
        let subTotal = 0;
        let discountTotal = 0;
        let taxTotal = 0;
        let grandTotal = 0;
        myCart.map((i) => {
            subTotal += i.price * i.quantity;
            discountTotal += ((i.price * DiscountPercent / 100) * i.quantity);
            taxTotal += ((i.price * TaxPercent / 100) * i.quantity);

        })
        grandTotal = discountTotal + taxTotal;
        setUpdateTotalAmount(Math.round(subTotal))
        setDiscountTotalAmount(Math.round(subTotal * DiscountPercent / 100))
        setTaxTotalAmount(Math.round(subTotal * TaxPercent / 100))
        setTotalAmount(Math.round(grandTotal + deliveryFee));


    }
    useEffect(() => {
        updateAmount()
        // Will Unmount //
        return () => {

        }

    }, [isFocused])
    return (
        <View style={Styles.mainContainer}>
            <SafeAreaView>
                <View style={Styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddToCart")}>
                        <View style={Styles.leftHeader}>
                            <Feather name='chevron-left' size={12} color={colors.textDark} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <Text style={Styles.cartTitle}>Checkout</Text>
            <View style={{ paddingHorizontal: 30, marginTop: 30, marginBottom: 90, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ alignItems: 'flex-start', width: '50%', }}>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>Sub Total</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>{`Discount(${DiscountPercent}%)`}</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>{`Tax(${TaxPercent}%)`}</Text>
                    <Text style={{ color: colors.textLight, fontFamily: 'Montserrat-SemiBold' }}>Delivery Fee</Text>
                    <Text style={{ color: colors.textDark, fontSize: 18, fontFamily: 'Montserrat-SemiBold' }}>{`Total Amount`}</Text>

                </View>
                <View style={{ alignItems: 'flex-end', width: '50%' }}>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${Math.floor(updateTotalAmount)}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${discountTotalAmount}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${taxTotalAmount}`}</Text>
                    <Text style={{ color: colors.textLight, fontWeight: '600', fontFamily: 'Montserrat-Bold' }}>{`${currency} ${deliveryFee}`}</Text>
                    <Text style={{ color: colors.textDark, fontWeight: '600', fontFamily: 'Montserrat-Bold', fontSize: 18 }}>{`${currency} ${Math.floor(totalAmount)}`}</Text>
                </View>
            </View>
            <View style={Styles.modal}>
                <TouchableOpacity onPress={() => alert(`Your ${totalAmount} Rupees Order is Placed Successfully`)} style={{ flexDirection: 'row', width: '90%', height: 70, backgroundColor: colors.primary, borderRadius: 15, }}>
                    <Text style={{ width: '90%', justifyContent: 'flex-start', alignSelf: 'center', paddingLeft: 30, color: colors.white, fontWeight: 'bold', fontSize: 18 }}>
                        Place Order
                    </Text>
                    <Feather style={{ width: '10%', justifyContent: 'flex-end', alignSelf: 'center', }} name='chevron-right' size={20} color={colors.white} />

                </TouchableOpacity>
            </View>
        </View>
    );


}

export default Checkout;

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'

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
    cartTitle: {
        fontSize: 30,
        marginHorizontal: 30,
        marginVertical: 15,
        fontFamily: 'Montserrat-SemiBold'

    },
    modal: {
        // flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
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