import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import { color } from '@rneui/base';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "AlbumModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "AlbumModule">;

const AlbumModal = () => {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const {
        params: { albumId, albumTitle, userId }
    } = useRoute<PostModalScreenRouteProp>();
    const [photos, setPhotos] = useState<Photo[]>([])
    const url = "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId;
    const [isLoading, setIsLoading] = useState(true);

    const deletePhoto = async (photo: Photo, localNavigation: any) => {
        setIsLoading(true);
        axios.delete('https://jsonplaceholder.typicode.com/photos/' + photo.id)
        .then((response: AxiosResponse) => {
            const index = photos.indexOf(photo);
            photos.splice(index, 1);
            setIsLoading(false);
            localNavigation.goBack();
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            localNavigation.goBack();
        });
    }

    const addPhoto = async (imageUri: string, photoTitle: string, localNavigation: any) => {
        if (imageUri != '' && photoTitle != '') {
            setIsLoading(true);
            const request = {"albumId": albumId, "title": photoTitle, "url": imageUri, "thumbnailUrl": imageUri}
            axios.post('https://jsonplaceholder.typicode.com/photos', request)
            .then((response: AxiosResponse) => {
                const photo = response.data;
                photos.unshift(photo);
                localNavigation.goBack();
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                localNavigation.goBack()
            });
        }
    }

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
                    { 
                        userId == 3 ? (
                            <TouchableOpacity 
                            style={styles.addImageButton}
                            onPress={() =>
                                // @ts-ignore
                                navigation.navigate('AddPhotoModule', {
                                    uploadPhotoFunction: addPhoto
                                }
                            )}
                            >
                            <Text style={styles.buttonText}>Add image</Text>
                        </TouchableOpacity>
                        ) : (
                            null
                        )
                    }
                    <FlatList
                        data={photos}
                        renderItem={({item}) => (
                            <PhotoCard photo={item} deletePhotoFunction={deletePhoto}></PhotoCard>
                        )}
                        numColumns={2}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addImageButton: {
        backgroundColor: Variables.iconsActiveColor,
        margin: 5,
        borderRadius: 5,
        height: 35,
        color: '#fff',
        textAlign: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40
    }
});

export default AlbumModal