import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import { Photo } from '../interfaces/PhotoInterfacce';
import axios, { AxiosResponse } from 'axios';
import { FlatList } from 'react-native';
import PhotoCard from '../components/PhotoCard';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "AlbumModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "AlbumModule">;

const AlbumModal = () => {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const {
        params: { albumId, albumTitle }
    } = useRoute<PostModalScreenRouteProp>();
    const [photos, setPhotos] = useState<Photo[]>([])
    const url = "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId;

    useEffect(() => {
        axios.get<Photo[]>(url)
        .then((response: AxiosResponse) => {
            setPhotos(response.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <Text>{albumTitle}</Text>
                <Text>{albumId}</Text>
                <Text>Photos:</Text>
                <FlatList
                    data={photos}
                    renderItem={({item}) => (
                        <PhotoCard {...item}></PhotoCard>
                    )}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    )
}

export default AlbumModal