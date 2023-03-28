import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useTailwind} from 'tailwind-rn';
import { Album } from '../interfaces/AlbumInterface';
import axios, { AxiosResponse } from 'axios';
import AlbumCard from '../components/AlbumCard';

const AlbumsScreen = () => {
    const tailwind = useTailwind();
    const [albums, setAlbums] = useState<Album[]>([])
    const url = "https://jsonplaceholder.typicode.com/posts"

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