import React, { useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

export default function Setting() {

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Setting</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#eee'
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
    color: 'grey',
  },

})