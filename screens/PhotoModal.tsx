import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import Variables from '../props/Variables';

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
        <View testID="PhotoModalScreen">
            <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                <Text style={[tailwind("m-5 text-xl"), styles.header]}>Close</Text>
            </TouchableOpacity>
            <View>
                <Image source={{uri: photoUrl}} style={styles.image}/>
                <Text style={[tailwind("m-5"), styles.header]}>{photoTitle}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: 400
    },
    header: {
        color: Variables.headerTextColor,
        fontWeight: "bold"
    }
});

export default PhotoModal