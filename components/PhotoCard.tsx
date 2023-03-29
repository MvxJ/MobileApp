import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Photo } from '../interfaces/PhotoInterfacce'
import { useNavigation } from '@react-navigation/native'

const PhotoCard = (photo: Photo) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => 
                // @ts-ignore
                navigation.navigate('PhotoModule', {
                    photoUrl: photo.url,
                    photoTitle: photo.title
                })
            }
            style={styles.card}
        >
            <View>
                <Image source={{uri: photo.thumbnailUrl}} style={styles.icon}/>
                <Text>{photo.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 150,
        height: 150,
    },
    card: {
        flex: 1, 
        flexDirection: "column", 
        margin: 4,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        padding: 4
    }
});

export default PhotoCard