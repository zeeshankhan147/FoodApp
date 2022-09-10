import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import Screens
import TabRoutes from './TabRoutes';
import DetailView from './../DetailView'
import ProductCart from '../productCart';
import MyOrders from '../MyOrders';
import AddToCart from '../addToCart';
import Register from '../Register';
import Search from '../Search';
import AnimatedCard from '../AnimatedCard';
import HomeProduct from '../HomeProduct';
import Checkout from '../Checkout';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Route() {

  return (


    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      initialRouteName='Tab'>
      
      <Stack.Screen name="Tab" component={TabRoutes} />
      <Drawer.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="DetailView" component={DetailView} />
      <Stack.Screen name="AddToCart" component={AddToCart} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="HomeProduct" component={HomeProduct} />
      <Stack.Screen name="ProductCart" component={ProductCart} />
      <Stack.Screen name="Animated" component={AnimatedCard} />
      <Stack.Screen name="Checkout" component={Checkout} />

    </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Route;