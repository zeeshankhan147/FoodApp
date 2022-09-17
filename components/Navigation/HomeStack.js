import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Screens
import DetailView from './../DetailView'
import ProductCart from '../productCart';
import MyOrders from '../MyOrders';
import AddToCart from '../addToCart';
import Register from '../Register';
import Search from '../Search';
import SignUp from '../signUp';
import Home from '../home';
import AnimatedCard from '../AnimatedCard';
import HomeProduct from '../HomeProduct';
import Checkout from '../Checkout';


const Stack = createNativeStackNavigator();
export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            {/* <Stack.Screen options={{ headerShown: false }} name="DetailView" component={DetailView} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="AddToCart" component={AddToCart} /> */}
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            {/* <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="HomeProduct" component={HomeProduct} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="ProductCart" component={ProductCart} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Animated" component={AnimatedCard} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Checkout" component={Checkout} /> */}
            <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
            <Stack.Screen options={{ headerShown: false }} name="MyOrders" component={MyOrders} />
        </Stack.Navigator>

    )
}