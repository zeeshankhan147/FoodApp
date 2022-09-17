import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView
} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import colors from '../assets/colors/colors';


export default function OrderDetail(props, { navigation }) {
    const { item } = props.route.params;
    const dispatch = useDispatch();
    useEffect(() => {
        console.warn(item.date);
    })


    return (
        <View style={styles.mainContainer}>
            <Text>{item.date}</Text>
            <Text>Comming Soon</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }

})