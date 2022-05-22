import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Import Screens
import TabRoutes from './TabRoutes';
import Cart from '../cart';
import ProductCart from '../productCart';
import MyOrders from '../MyOrders';
import AddToCart from '../addToCart';
import Register from '../Register';
import Search from '../Search';
import MyDrawer from './MyDrawer';
import SignUp from '../signUp';
import Home from '../home';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="AddToCart" component={AddToCart} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="Search" component={Search} />
      {/* <Drawer.Screen name="SignUp" component={SignUp} /> */}
      <Drawer.Screen name="ProductCart" component={ProductCart} />
    </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default Route;