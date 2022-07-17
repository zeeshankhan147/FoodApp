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
import MyDrawer from './MyDrawer';
import SignUp from '../signUp';
import Home from '../home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeProduct from '../HomeProduct';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Route() {

  return (


    <NavigationContainer>
      <Drawer.Navigator
      drawerContent={(props) => <MyDrawer {...props} />}
      screenOptions={{headerShown:false}}
      >
      
      {/* <Drawer.Screen name="MyDrawer" component={MyDrawer} /> */}
      <Drawer.Screen name="Tab" component={TabRoutes} />
      {/* <Drawer.Screen name="MyOrders" component={MyOrders} /> */}
      <Drawer.Screen name="DetailView" component={DetailView} />
      <Drawer.Screen name="AddToCart" component={AddToCart} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="HomeProduct" component={HomeProduct} />
      <Drawer.Screen name="ProductCart" component={ProductCart} />
    </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default Route;