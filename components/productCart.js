import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList, Alert,SafeAreaView ,ActivityIndicator} from 'react-native';
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
    } = props;
    
    const [qtyPlus, setQtyPlus] = useState(1)

    const adding = (price) => {
        setQtyPlus(qtyPlus+1)
        addQuantity(price,qtyPlus+1)
    }
    const minus = (price) => {
        setQtyPlus(qtyPlus-1)
        removeQuantity(price,qtyPlus-1)
    }

   
    return(
        
        <View style={Styles.container}>
                    
                <TouchableOpacity style={Styles.imageView} key={itemId} onPress={()=> navigation()}>
                <Image style={Styles.image} source={image}/>
                </TouchableOpacity>

                <View style={Styles.textView}>

                        <Text style={Styles.title}>{title}</Text>
                        <Text style={Styles.price}>Rs.{Math.ceil(price)* qtyPlus}</Text>

                    <View style={Styles.quantityController}>
                        <TouchableOpacity style={Styles.qtyPlus} key={index}  onPress={()=>  adding(price)}>
                            <Feather name='plus' size={12} color='#fff' />
                        </TouchableOpacity>
                            <Text style={Styles.count} >{qtyPlus}</Text>
                        <TouchableOpacity style={Styles.qtyMinus} key={index} onPress={()=>  {qtyPlus > 1 ? minus(price) : 1}}>
                            <Feather name='minus' size={12} color='#fff' />
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
        width:'80%'


    },
    title: {
        fontSize: 12,
        fontWeight: '400'

    },
    price: {
        fontSize: 10,
        color:Colors.textDark,
        fontWeight:'800'
        // position:'absolute',
        // right:22,
        // top:26
    },
    cartTitle:{
        fontSize:30,
        marginHorizontal:30,
        marginVertical:15,
        fontFamily:'Montserrat-SemiBold'

    },
    quantityController:{
        position:'absolute',
        right:35,
        // top:1,
        alignItems:'center',
        flex:1,
        flexDirection:'row'
    },
    qtyPlus:{
        padding:3,
        // borderWidth:1,
        // borderColor:colors.textDark,
        backgroundColor:'grey',
        marginLeft:28,
        borderRadius:6
    },
    qtyMinus:{
        padding:3,
        // borderWidth:1,
        // borderColor:colors.textDark,
        backgroundColor:'grey',
        borderRadius:6
    },
    count:{
        marginLeft:10,
        marginRight:10,
    }
})