import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import {useTailwind} from 'tailwind-rn';
import { Album } from '../interfaces/AlbumInterface';
import axios, { AxiosResponse } from 'axios';
import AlbumCard from '../components/AlbumCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';

export type AlbumScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Albums'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const AlbumsScreen = () => {
    const tailwind = useTailwind();
    const [albums, setAlbums] = useState<Album[]>([])
    const navigation = useNavigation<AlbumScreenNavigationProp>();
    const url = "https://jsonplaceholder.typicode.com/posts"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    });

    useEffect(() => {
        axios.get<Album[]>(url)
        .then((response: AxiosResponse) => {
            setAlbums(response.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={tailwind("p-2")}>
            <FlatList
                data={albums}
                renderItem={({item}) => (
                    <AlbumCard {...item}></AlbumCard>
                )}
                numColumns={2}
            />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AlbumsScreen