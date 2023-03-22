import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';

const ProfileScreen = () => {
    const tailwind = useTailwind();

    return (
        <SafeAreaView>
            <Text style={tailwind("text-blue-500")}>ProfileScreen</Text>
        </SafeAreaView>
    )
}

export default ProfileScreen