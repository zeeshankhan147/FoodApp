import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ScrollView,
    ToastAndroid,
    TextInput
} from 'react-native';

import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import category from '../assets/data/category';
import popular from '../assets/data/popular';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

Feather.loadFont();
MaterialCommunityIcons.loadFont();


export default function Search({ navigation }) {
    const [searchData, setSearchData] = useState([])
    const [text, setText] = useState('')
    const [find, setFind] = useState(false)


    useEffect(() => {


    }, [])

    function searching(value) {
        value.length == 0 ? setFind(false) : setFind(true)
        setText(value)
        let searchArr = [];
        popular.map((item) => {
            if ((item.title.toLowerCase()).includes(value.toLowerCase())) {
                searchArr.push(item)
            }
            setSearchData(searchArr)
        })

    }

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 20 }}>
                <View style={styles.searchWrapper}>

                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{paddingRight:15,borderRightColor:colors.textLight,borderRightWidth:1}}>  
                        <Feather name="chevron-left" size={20} color={colors.textDark} />
                    </TouchableOpacity>
                    <View style={styles.searchTextWrapper}>
                        <TextInput
                            autoCapitalize='none'
                            placeholder={'Explore your food'}
                            onChangeText={(value) => searching(value)}
                            textValue={text}


                            style={styles.searchText}></TextInput>
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={styles.popularWrapper}>

                    {find ? searchData.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Cart', { item: item })}>
                            <View style={[styles.popularCardWrapper,
                            {
                                marginTop: item.id == 1 ? 15 : 20,
                            }
                            ]}>
                                <View>

                                    <View style={styles.popularTopWrapper}>
                                        <MaterialCommunityIcons style={styles.crownIcon} name="crown" size={15} color={colors.primary} />
                                        <Text style={styles.popularTopTitle}>top of the week</Text>
                                    </View>

                                    <Text style={styles.popularTitle}>{item.title}</Text>
                                    <Text style={styles.popularWeight}>Weight  {item.weight}</Text>

                                    <View style={styles.popularBottomItem}>

                                        <View style={styles.addItemBtn}>
                                            <Feather name="plus" size={16} color={colors.black} />
                                        </View>

                                        <View style={styles.ratingWrapper}>
                                            <MaterialCommunityIcons name="star" size={15} />
                                            <Text style={styles.ratingText}>{item.rating}</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={styles.popularImageWrapper}>
                                    <Image style={styles.popularImage} source={item.image} />
                                </View>

                            </View>
                        </TouchableOpacity>
                    )) : <View style={{ alignItems: 'center', marginTop: '80%' }}><Text style={{ fontSize: 18 }}>No Search Item</Text></View>}


                </View>
            </ScrollView>



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#d7d7d7f5',
        marginHorizontal: 30,
        borderRadius: 8,

    },
    searchTextWrapper: {
        marginLeft: 15,
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.textDark,


    },
    searchText: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 16,
        color: colors.textLight,


    },
    popularWrapper: {
        paddingHorizontal: 30,
        marginTop: 15,
    },
    popularText: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: colors.black,

    },
    popularCardWrapper: {
        backgroundColor: colors.white,
        marginTop: 11,
        paddingLeft: 20,
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 10,
    },
    popularTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 24,
    },
    crownIcon: {},
    popularTopTitle: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.black,

    },
    popularTitle: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 22,
        fontSize: 14,
        color: colors.textDark,
        marginTop: 20,

    },
    popularWeight: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 22,
        marginTop: 5,
        color: colors.textLight,
    },
    popularBottomItem: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        marginLeft: -20,
        marginBottom: -1,
    },
    addItemBtn: {
        width: 90,
        height: 53,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,

    },
    ratingText: {
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 5,
        color: colors.textDark,
    },
    popularImageWrapper: {
        marginLeft: 20,
        alignItems: 'center',


    },
    popularImage: {
        width: 210,
        height: 125,
        resizeMode: 'contain',
        marginTop: 20,


    },

})