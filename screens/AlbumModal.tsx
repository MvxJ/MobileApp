import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
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
import Variables from '../props/Variables';

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
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: albumTitle,
            headerTintColor: Variables.headerTextColor
        });
    });

    useEffect(() => {
        axios.get<Photo[]>(url)
        .then((response: AxiosResponse) => {
            setPhotos(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
                ) : (
                <View style={tailwind("p-2")}>
                    <FlatList
                        data={photos}
                        renderItem={({item}) => (
                            <PhotoCard {...item}></PhotoCard>
                        )}
                        numColumns={2}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default AlbumModal