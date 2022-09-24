import React, { useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors/colors';

export default function TextComponent(props) {

    const { header } = props.route.params.text;
    const { Description } = props.route.params.text;

    return (
        <ScrollView style={styles.mainContainer}>
            {/* HEADER */}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <Ionicons name='chevron-back' size={24} color={colors.textDark} style={{ padding: 5 }} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>{header}</Text>
            </View>
            
            <View style={{ padding: 20 }}>
                <Text style={styles.description}>{Description}</Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#eee',
        paddingHorizontal: 30,
        marginBottom: 20
    },
    titleContainer: {
        marginTop: 30,
        paddingVertical: 6,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'

    },
    mainTitle: {
        fontSize: 26,
        fontFamily: 'Montserrat-Bold',
        color: colors.textDark,
    },
    description: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        color: colors.textLight,
    }


})