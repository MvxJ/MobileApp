import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn';

const AlbumsScreen = () => {
    const tailwind = useTailwind();
    return (
        <ScrollView>
            <Text style={tailwind("text-pink-500")}>AlbumsScreen</Text>
        </ScrollView>
    )
}

export default AlbumsScreen