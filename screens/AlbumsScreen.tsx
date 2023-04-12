import { View, Text, SafeAreaView, ScrollView, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useTailwind} from 'tailwind-rn';
import { Album } from '../interfaces/AlbumInterface';
import axios, { AxiosResponse } from 'axios';
import AlbumCard from '../components/AlbumCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type AlbumScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Albums'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const AlbumsScreen = () => {
    const tailwind = useTailwind();
    const [albums, setAlbums] = useState<Album[]>([])
    const url = "https://jsonplaceholder.typicode.com/albums";
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        axios.get<Album[]>(url)
        .then((response: AxiosResponse) => {
            setAlbums(response.data);
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
                <ScrollView style={tailwind("p-1")}>
                    <View style={[tailwind('flex-grow rounded-md mb-0 p-2'), styles.searchBox]}>
                        <TextInput
                            style={tailwind('flex-grow ml-2')}
                            placeholder="Search..."
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>

                    <FlatList
                        data={albums.filter((album) => album.title.toLowerCase().includes(searchQuery.toLowerCase()))}
                        renderItem={({item}) => (
                            <AlbumCard {...item}></AlbumCard>
                        )}
                        numColumns={2}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        height: 32,
        backgroundColor: '#fff',
        margin: 3.50,
        marginBottom: 3
    }
});

export default AlbumsScreen