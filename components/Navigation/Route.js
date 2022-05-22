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
import signUp from '../signUp';
import home from '../home';

const Stack = createNativeStackNavigator();

function Route() {

  return (

    
    <NavigationContainer>
 
      <Stack.Navigator
        // screenOptions={{ headerShown: false }}


      >
        {/* {MainStack(Stack)} */}

        <Stack.Screen
          name="Tab"
          component={TabRoutes}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{ headerShown: true }}
          />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="AddToCart"
          component={AddToCart}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="ProductCart"
          component={ProductCart}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

export default Route;