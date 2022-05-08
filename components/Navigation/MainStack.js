import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import TabRoutes from './TabRoutes'
import Home from '../home'
import Cart from '../cart'
import AddToCart from '../addToCart'
import ProductCart from '../productCart'





export default function (Stack) {
  return (
    <>
    <Stack.Screen
        name="Tabs"
        component={TabRoutes}
    />
    {/* <Stack.Screen
        name="Home"
        component={Home}
        
    />
    <Stack.Screen
        name="Cart"
        component={Cart}
    />
    <Stack.Screen
        name="AddToCart"
        component={AddToCart}
    />
    <Stack.Screen
        name="ProductCart"
        component={ProductCart}
    /> */}
    
    
    </>
  
  )
}
