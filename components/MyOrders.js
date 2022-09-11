import * as React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../assets/colors/colors';

export default function MyOrders() {
  const orders = useSelector(state => state.orders.myOrders)
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => sheetRef.current.snapTo(0)}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <Text style={{ alignSelf: 'center', marginTop: '50%', fontSize: 20 }}>No data found</Text>
      <Text style={{ width: 200, textAlign: 'center', alignSelf: 'center', marginTop: 5, marginBottom: 18 }}>very oldest order please new order and give 20% discount</Text>
      <ActivityIndicator size={"small"} color={colors.primary} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Orders</Text>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={orders}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => sheetRef.current.snapTo(500)} style={styles.orderBox}>

                <View style={styles.orderIdSec}>
                  <Text style={styles.orderId}>{item.orderId}</Text>
                  <Text style={styles.dateTime}>12:11:AM - 30-sep-2022</Text>
                </View>

                <View style={styles.priceSec}>
                  <Text style={styles.totalAmount}>Rs {item.totalAmount}</Text>
                  <Text style={styles.deliveryTransc}>{item.deliveryTransc}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 500]}
        callbackNode={fall}
        initialSnap={0}
        borderRadius={35}
        renderContent={renderContent}
        enabledGestureInteraction={true}

      />
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary

  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',

  },
  mainTitle: {
    fontSize: 26,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 6,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  flatListContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingTop: 10,
    marginTop: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
    elevation: 20,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: '#8a8a8a',
    shadowRadius: 20,
    shadowOpacity: 1

  },
  orderBox: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#e4e4e4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  orderIdSec: {
    width: '70%',
    justifyContent: 'flex-start',
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold'
  },
  dateTime: {
    fontSize: 10,
    color: 'grey',
    fontFamily: 'Montserrat-Regular'
  },
  priceSec: {
    width: '30%',
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
  deliveryTransc: {
    fontSize: 10,
    color: colors.price,
    fontFamily: 'Montserrat-Bold'
  },
  bottomSheet: {
    backgroundColor: colors.background,
    padding: 16,
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    right: '5%',
    top: '2%',
  },
  closeText: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  }
})