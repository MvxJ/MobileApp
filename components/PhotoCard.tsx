import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { Photo } from '../interfaces/PhotoInterfacce'
import { useNavigation } from '@react-navigation/native'
import Variables from '../props/Variables'

const PhotoCard = ({photo, deletePhotoFunction}: {photo: Photo, deletePhotoFunction: any}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            testID="PhotoCardComponent"
            onPress={() => 
                // @ts-ignore
                navigation.navigate('PhotoModule', {
                    photoUrl: photo.url,
                    photoTitle: photo.title,
                    photo: photo,
                    removePhotoFunction: deletePhotoFunction
                })
            }
            style={styles.card}
        >
            <View key={photo.id}>
                <Image source={{uri: photo.thumbnailUrl}} style={styles.icon}/>
                <Text style={styles.title}>{photo.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Variables.headerTextColor,
        fontWeight: "bold",
        flex: 1,
        height: 50,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    card: {
        flex: 1, 
        flexDirection: "column", 
        margin: 4,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: "lightgray",
        overflow: "hidden"
    },
    icon: {
        width: '100%',
        height: 128,
    }
});

export default PhotoCard