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
    TextInput,
    Dimensions
} from 'react-native';

import colors from '../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import category from '../assets/data/category';
import popular from '../assets/data/popular';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import BANNER_IMAGE from '../assets/images/banner1.png'
import ProductCart from './productCart';

Feather.loadFont();
MaterialCommunityIcons.loadFont();
const BannerWidth = Dimensions.get("window").width;
const BannerHeight = (BannerWidth / 7) * 2;

export default Home = ({ navigation, route, props }) => {
    const [counter, setCounterState] = useState(0)
    const isFocused = useIsFocused();
    const [catSelected, setCatSelected] = useState(null)
    const [quantity, setQuantity] = useState(1)
    



    function drawerOpening() {
        navigation.openDrawer()
    }

    function categorySelection(item) {
        setCatSelected(item.id)
    }

    function counterFunc() {
        AsyncStorage.getItem('@cartItem').then((ct) => {

            const CNTER = JSON.parse(ct);
            const cft = Object.keys(CNTER).length;
            setCounterState(cft)

        })
    }
    const plusMinus = (qty) => {
        setQuantity(qty) 
    }

    const itemDel = (index) => {
       
    }



    useEffect(() => {
        setCatSelected(1)
        AsyncStorage.getItem('@userInfo').then((user) => {
            console.log('infoooo', JSON.parse(user));
        })

        counterFunc();

    }, [isFocused])



    const renderCategoryItem = ({ item }) => {


        return (
            <TouchableOpacity style={[styles.categoryListBox,
            {
                backgroundColor: item.id == catSelected ? colors.primary : colors.white,
                marginLeft: item.id == 1 ? 30 : 0,
                elevation: item.id == catSelected ? 3 : 8,


            }
            ]} onPress={() => categorySelection(item)}>
                <Image style={styles.categoryListImage} source={item.image} />
                <Text style={[styles.categorylistText, {
                    color: item.id == catSelected ? colors.white : colors.black
                }]}>{item.title}</Text>
                <View style={[styles.categoryIconCircle,
                {
                    backgroundColor: item.id == catSelected ? colors.white : colors.secondary,
                }
                ]}>
                    <Feather style={[styles.categoryListIcon,
                    {
                        color: item.id == catSelected ? colors.black : colors.white,
                    }
                    ]} name="chevron-right" size={15} />
                </View>
            </TouchableOpacity>

        );
    }
    const renderPopularItem = ({ item }) => {
        return (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Cart', { item: item })}>
                <View style={[styles.popularCardWrapper,
                {
                    marginLeft: item.id == 1 ? 30 : 0,
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

        );

    }


    return (


        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false}>
                {/* header */}
                <SafeAreaView style={styles.navBar}>
                    <TouchableOpacity onPress={() => drawerOpening()}>
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

                {/* Banner */}
                <View style={styles.bannerWrapper}>
                    <View style={{ paddingHorizontal: 30 }} >
                        <Image source={BANNER_IMAGE}
                            style={{ height: '100%', width: '100%', borderRadius: 10 }}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* search */}
                <View style={styles.searchWrapper} >

                    <TouchableOpacity>
                        <Feather name="search" size={20} color={colors.textDark} />
                    </TouchableOpacity>
                    <View style={styles.searchTextWrapper}>
                        <TextInput
                            onFocus={() => navigation.navigate('Search')}
                            autoCapitalize="words"
                            placeholder={'Explore your food'}


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
                    <Text style={styles.popularText}>20% Off Exclusive Deal</Text>
                    <View style={{ flex: 1, paddingVertical: 10, marginTop: 10 }}>
                        <FlatList
                            data={popular}
                            renderItem={renderPopularItem}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentInsetAdjustmentBehavior='automatic'
                        />
                    </View>

                </View>
                {/* Menu Item */}
                <View style={{
                    flex: 1, marginTop: 20, marginHorizontal: 0, marginBottom: 80,
                }}>
                   
                    {popular.map((item,index) => (
                         <ProductCart
                            from={'home'}
                            item={item}
                            index={index}
                            itemId={item.id}
                            image={item.image}
                            title={item.title}
                            price={item.price}
                            qty={quantity}
                            navigation={navigation}
                            addHome={plusMinus}
                            removeHome={plusMinus}
                            deleteItem={itemDel}
                         />
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
    bannerWrapper: {
        marginTop: 30,
        width: '100%',
        height: '8%',





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
        paddingHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#d7d7d7f5',
        marginHorizontal: 30,
        borderRadius: 8,


    },
    searchTextWrapper: {
        marginLeft: 14,
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.textDark,


    },
    searchText: {
        fontFamily: 'Montserrat-Semibold',
        fontSize: 16,
        color: colors.textLight,


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
        // paddingHorizontal: 30,
        // marginTop: 20,
        // marginBottom:180,
        // backgroundColor:'red',
    },
    popularText: {
        paddingLeft: 30,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: colors.black,

    },
    popularCardWrapper: {
        backgroundColor: colors.white,
        marginRight: 20,
        // marginTop: 11,
        // paddingLeft: 10,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        // shadowColor: colors.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.05,
        // shadowRadius: 20,
        // elevation: 10,
        // marginBottom: 10,
        width: 300,


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
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
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
