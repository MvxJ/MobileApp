import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Main: undefined;
    Profile: {userId: string, name: string}
    Posts: {order: any}
}

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Group>
            <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator