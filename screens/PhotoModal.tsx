import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "PhotoModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "PhotoModule">;

const PhotoModal = () => {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const {
        params: { photoUrl, photoTitle }
    } = useRoute<PostModalScreenRouteProp>();

    return (
        <View>
            <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                <Text>Close</Text>
            </TouchableOpacity>
            <View>
                <Image source={{uri: photoUrl}} style={styles.image}/>
                <Text>{photoTitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: 400
    }
});

export default PhotoModal