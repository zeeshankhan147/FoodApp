import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

export default function MyOrders() {
  const orders = useSelector(state => state.orders.myOrders)
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 30,
          marginTop: 20,
          paddingHorizontal: 30,
          paddingVertical: 6
        }}>MyOrders</Text>

      <View>
        <FlatList
          data={orders}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text>
                  {item.phoneNumber}
                </Text>
                <Text>
                  {item.deliveryTransc}
                </Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}