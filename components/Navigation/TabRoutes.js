import React from 'react';
import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './../home';
import SignUp from './../signUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../assets/colors/colors';
import AddToCart from '../addToCart';
import Cart from '../cart';
Feather.loadFont();
MaterialCommunityIcons.loadFont();
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="AddToCart" component={AddToCart}/>
      <Stack.Screen name="Cart" component={Cart}/>
    </Stack.Navigator>
  )
}
function SignUpStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="AddToCart" component={AddToCart}/>
      <Stack.Screen name="Cart" component={Cart}/>
    </Stack.Navigator>
  )
}
function AddToCartStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="AddToCart" component={AddToCart}/>
      <Stack.Screen name="Cart" component={Cart}/>
    </Stack.Navigator>
  )
}

function TabRoutes() {

  return (
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown:false,
      tabBarActiveTintColor:colors.secondary,
      tabBarShowLabel:false,
      tabBarStyle:{
        
        

      }
      }}
      >
        <Tab.Screen name="SignUp" component={SignUpStack}
        options={{
          tabBarIcon: ({focused})=>{
            return(
              <MaterialCommunityIcons name="account" size={25} color={focused ? colors.secondary : 'grey'}/>
            )
          }
        }}
        />
        <Tab.Screen name="Home" component={HomeStack} 
        options={{
          tabBarIcon: ({focused})=>{
            return(
              <MaterialCommunityIcons name="home" size={25} color={focused ? colors.secondary : 'grey'}/>
            )
          }
        }}
        />
        <Tab.Screen name="AddToCart" component={AddToCartStack} 
        options={{
          tabBarIcon: ({focused})=>{
            return(
              <Feather name="shopping-cart" size={25} color={focused ? colors.secondary : 'grey'}/>
            )
          }
        }}
        />
        
        
      </Tab.Navigator>

  );
}

export default TabRoutes; 