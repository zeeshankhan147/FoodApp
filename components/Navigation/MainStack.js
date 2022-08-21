import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import TabRoutes from './TabRoutes'
import Home from '../home'
import AddToCart from '../addToCart'
import ProductCart from '../productCart'
import DetailView from '../DetailView'
import Register from '../Register'
import Search from '../Search'
import HomeProduct from '../HomeProduct'
import AnimatedCard from '../AnimatedCard'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import signUp from '../signUp'
import MyOrders from '../MyOrders'

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator initialRouteName='Home' >
            <Stack.Screen name="DetailView"  options={{headerShown:false}} component={DetailView} />
            <Stack.Screen name="AddToCart"  options={{headerShown:false}}component={AddToCart} />
            <Stack.Screen name="Register" options={{headerShown:false}} component={Register} />
            <Stack.Screen name="Search" options={{headerShown:false}} component={Search} />
            <Stack.Screen name="HomeProduct"  options={{headerShown:false}}component={HomeProduct} />
            <Stack.Screen name="ProductCart" options={{headerShown:false}} component={ProductCart} />
            <Stack.Screen name="Animated"  options={{headerShown:false}}component={AnimatedCard} />
            <Stack.Screen name="Home"  options={{headerShown:false}}component={Home} />
            <Stack.Screen name="SignUp" options={{headerShown:false}} component={signUp} />
            <Stack.Screen name="MyOrder"  options={{headerShown:false}}component={MyOrders} />
        </Stack.Navigator>

    )
}
