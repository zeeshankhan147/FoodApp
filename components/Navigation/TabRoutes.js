import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './../home';
import SignUp from './../signUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../../assets/colors/colors';
import { useDispatch, useSelector } from "react-redux";


Feather.loadFont();
MaterialCommunityIcons.loadFont();

import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyOrders from '../MyOrders';
import MyDrawer from './MyDrawer';


const Tab = createBottomTabNavigator();

function TabRoutes() {
  const isFocused = useIsFocused();
  const myUser = useSelector(state => state.auth.user)
  const myCart = useSelector(state => state.cart.cartData)


  useEffect(() => {

  }, [isFocused])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarShowLabel: false,
        tabBarStyle: {
        }
      }}
    >

      <Tab.Screen name="SignUp" component={myUser ? MyOrders : SignUp}
        // options={{ headerShown: false }}

        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons name={myUser ? 'account-cog' : 'account'} size={25} color={focused ? colors.secondary : 'grey'} />
            )
          }
        }}
      />
      <Tab.Screen name="Home" component={Home}
        // options={{ headerShown: false }}

        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons name="home" size={25} color={focused ? colors.secondary : 'grey'} />
            )
          }
        }}
      />
      <Tab.Screen name="MyOrders" component={MyOrders}
        // options={{ headerShown: true }}

        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialCommunityIcons
                  name={`clock`}
                  size={25}
                  color={focused ? colors.secondary : 'grey'}

                />
                {myCart.length > 0 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: colors.background,
                      alignItems: "center",
                      borderRadius: 20,
                      height: 18,
                      width: 18,
                      position: "absolute",
                      bottom: 14,
                      left: 15,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="star"
                      style={{ color: colors.price, fontSize: 10, textAlign: "center", fontWeight: '800' }}
                    />


                  </View>
                ) : <View />}
              </View>
            )
          }
        }}
      />


    </Tab.Navigator>

  );
}

export default TabRoutes;