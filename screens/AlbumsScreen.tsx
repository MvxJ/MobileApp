import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn';

const AlbumsScreen = () => {
    const tailwind = useTailwind();
    return (
        <SafeAreaView>
            <Text style={tailwind("text-pink-500")}>AlbumsScreen</Text>
        </SafeAreaView>
    )
}

export default AlbumsScreen