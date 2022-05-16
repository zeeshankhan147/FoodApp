import { View, Text } from 'react-native'
import React from 'react'

export default function MyOrders() {
  return (
    <View style={{flex:1, alignItems:'center'}}>
      <Text 
      style={{
          fontSize:30,
          marginTop:20,
          paddingHorizontal:30,
          paddingVertical:6
          }}>MyOrders</Text>
    </View>
  )
}