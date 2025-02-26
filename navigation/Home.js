import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../constants/theme'

export default function Home() {
  return (
    <View
    style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary
    }}
    >
        <Text>RIDELOGIC!!!!</Text>
    </View>
  )
}
