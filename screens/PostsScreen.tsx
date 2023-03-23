import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn';

const PostsScreen = () => {
    const tailwind = useTailwind();

    return (
        <SafeAreaView>
            <Text style={tailwind("text-green-500")}>PostsScreen</Text>
        </SafeAreaView>
    )
}

export default PostsScreen