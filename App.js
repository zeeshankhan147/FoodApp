import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import Cart from './components/cart';
import AddToCart from './components/addToCart';
import ProductCard from './components/productCart';
import SignUp from './components/signUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
        options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="Cart" component={Cart} 
        options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="AddToCart" component={AddToCart}
        options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="ProductCard" component={ProductCard}
        options={{
          headerShown:false,
        }}/>
        <Stack.Screen name="SignUp" component={SignUp}
        options={{
          headerShown:false,
        }}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App; 