import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Tickets() {
  return (
    <View
        style={styles.container}
    >
        <View
            style={styles.header}
        >
            <Text
                style={styles.haderText}
            >Tickets</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6C44',
        padding: 16,
    },
    hader: {
        alignItems: 'center',
        marginVertical: 16,
    },
    haderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFF',
    },
})