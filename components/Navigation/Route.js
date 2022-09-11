import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
import Setting from '../Setting';


import { createDrawerNavigator } from '@react-navigation/drawer';
import Onboarding from '../Onboarding';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Route() {
  const [initialRoutname, setInitialRoutname] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true)
    AsyncStorage.getItem('@ONBOARDING').then((val) => {
      const data = val;
      if (data && data === "Onboarding") {
        setInitialRoutname("Tab")
        setLoader(false)
      } else {
        setInitialRoutname("Onboarding")
        setLoader(false)
      }
    })
  }, [])

  return (

    <View style={{ flex: 1 }}>
      {initialRoutname ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRoutname}>

            <Stack.Screen name="Tab" component={TabRoutes} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Drawer.Screen name="MyOrders" component={MyOrders} />
            <Stack.Screen name="DetailView" component={DetailView} />
            <Stack.Screen name="AddToCart" component={AddToCart} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="HomeProduct" component={HomeProduct} />
            <Stack.Screen name="ProductCart" component={ProductCart} />
            <Stack.Screen name="Animated" component={AnimatedCard} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Setting" component={Setting} />

          </Stack.Navigator>
        </NavigationContainer>
      ) : null}
      <ActivityIndicator style={{ position: 'absolute', top: '50%', alignSelf: 'center' }} size="large" color={"pink"} animating={loader} />
    </View>

  );
}

export default Route;