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
import {useIsFocused } from '@react-navigation/native';


Feather.loadFont();
MaterialCommunityIcons.loadFont();


export default Home = ({ navigation, route, props }) => {
    const [counter, setCounterState] = useState(0)
    const isFocused = useIsFocused();
    const [search, setSearch] = useState('')
    

    function clear() {
        AsyncStorage.removeItem('k2')
        ToastAndroid.show("Clear Cart", ToastAndroid.SHORT);
        setCounterState(0)

    }
    function countify() {
        AsyncStorage.getItem('k2').then((ct) => {
            
                const CNTER = JSON.parse(ct);
                const cft = Object.keys(CNTER).length;
                setCounterState(cft)

        })
    }

    

    useEffect(() => {
        countify();



    }, [isFocused])

    const renderCategoryItem = ({ item }) => {

        
        return (
            <TouchableOpacity style={[styles.categoryListBox,
            {
                backgroundColor: item.selected ? colors.primary : colors.white,
                marginLeft: item.id == 1 ? 30 : 0,
                elevation: item.selected ? 3 : 8,

            }
            ]}>
                <Image style={styles.categoryListImage} source={item.image} />
                <Text style={styles.categorylistText}>{item.title}</Text>
                <View style={[styles.categoryIconCircle,
                {
                    backgroundColor: item.selected ? colors.white : colors.secondary,
                }
                ]}>
                    <Feather style={[styles.categoryListIcon,
                    {
                        color: item.selected ? colors.black : colors.white,
                    }
                    ]} name="chevron-right" size={15} />
                </View>
            </TouchableOpacity>

        );
    }

    
    return (

        
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
                {/* header */}
                <SafeAreaView style={styles.navBar}>
                    <TouchableOpacity onPress={() => clear()}>
                        {/* <Image style={styles.dp} source={require('../assets/images/profile.jpg')} /> */}
                        <Feather style={styles.ic_menu} name='menu' size={26} color={colors.textDark} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.rightHeader} onPress={() => navigation.navigate('AddToCart')}>
                        {counter > 0 ? (
                            <View style={{ position: 'absolute', top: -8, right: -8, backgroundColor: colors.background, width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: colors.textDark, fontWeight: '600' }}>
                                    {counter}
                                </Text>
                            </View>
                        ) : (
                            <View></View>
                        )}
                        <MaterialCommunityIcons name='shopping' size={22} color={colors.white} />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* title */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.subTitle}>{`Chinese - Pakistani\nExclusive 20%`}</Text>
                    <Text style={styles.title}>Special Item</Text>
                </View>

                {/* search */}
                <View style={styles.searchWrapper}>

                    <TouchableOpacity>
                    <Feather name="search" size={20} color={colors.textDark} />
                    </TouchableOpacity>
                    <View style={styles.searchTextWrapper}>
                        <TextInput 
                        placeholder={'Explore your food'}
                        onChange={(vl)=> setSearch(vl)}
                        
                        style={styles.searchText}></TextInput>
                    </View>
                </View>

                {/* category */}
                <View style={styles.categoryWrapper}>
                    <Text style={styles.categoryText}>Category</Text>
                    <View style={styles.categoryListWrapper}>
                        <FlatList
                            data={category}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                        />
                    </View>
                </View>

                {/* popular */}
                <View style={styles.popularWrapper}>
                    <Text style={styles.popularText}>Popular</Text>
                    {popular.map((item) => (
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
                    ))}


                </View>
            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 40,
        alignItems: 'center',
    },
    rightHeader: {
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    dp: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: colors.textLight,
        borderWidth: 1,
    },
    titleWrapper: {
        paddingHorizontal: 30,
        marginTop: 40,

    },
    subTitle: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        color: colors.textDark,

    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.textDark,
        marginTop: 10,

    },
    searchWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginTop: 36,
        alignItems: 'center',

    },
    searchTextWrapper: {
        marginLeft: 14,
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.textDark,


    },
    searchText: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 16,
        color: colors.textLight,
        marginBottom: -3,

    },
    categoryWrapper: {
        marginTop: 30,


    },
    categoryText: {
        paddingLeft: 30,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: colors.textDark,
    },
    categoryListBox: {
        backgroundColor: colors.background,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 20,
        marginTop: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 20,

    },
    categoryListImage: {
        marginTop: 15,
        width: 60,
        height: 60,

    },
    categorylistText: {
        fontSize: 14,
        color: colors.textDark,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 10,
        textAlign: 'center',

    },
    categoryIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 20,

    },
    categoryListIcon: {
        alignSelf: 'center',
        color: '#000',

    },
    popularWrapper: {
        paddingHorizontal: 30,
        // marginTop: 20,
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


});
