import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { useTailwind } from 'tailwind-rn/dist';
import Variables from '../props/Variables';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Album } from '../interfaces/AlbumInterface';
import axios, { AxiosResponse } from 'axios';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "PhotoModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "PhotoModule">;

const PhotoModal = () => {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const albumsUrl = 'https://jsonplaceholder.typicode.com/albums?userId=3';
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        axios.get<Album[]>(albumsUrl)
        .then((response: AxiosResponse) => {
            setAlbums(response.data);
        }).catch(error => {
        });
    }, []);

    const {
        params: { photo, removePhotoFunction }
    } = useRoute<PostModalScreenRouteProp>();

    return (
        <View testID="PhotoModalScreen">
            <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                <Text style={[tailwind("m-5 text-xl"), styles.header]}>Close</Text>
            </TouchableOpacity>
            <View>
                <Image source={{uri: photo.url}} style={styles.image}/>
                <Text style={[tailwind("m-5"), styles.header]}>{photo.title}</Text>
            </View>
            { albums.filter((album) => album.id == photo.albumId).length > 0 ?
                (
                    <View style={styles.wrapper}>
                        <TouchableOpacity 
                            onPress={() => {removePhotoFunction(photo, navigation)}}
                            style={[styles.removeButton, tailwind("rounded-md")]}
                        >
                            <Text style={[tailwind("text-white text-center font-bold"), styles.removeButtonText]}>Remove photo <FontAwesome5Icon name={'trash'} /></Text>
                        </TouchableOpacity>
                    </View>
                ) :
                (
                    null
                )
            }
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
    },
    removeButton: {
        width: '50%',
        backgroundColor: Variables.dangerTextColor,
    },
    removeButtonText: {
        height: 35,
        lineHeight: 40
    },
    wrapper: {
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
});

export default PhotoModal