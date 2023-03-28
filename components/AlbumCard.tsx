import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Album } from '../interfaces/AlbumInterface';
import { BackgroundImage } from '@rneui/base';

const AlbumCard = (album: Album) => {
    const tailwind = useTailwind();

    return (
        <View style={styles.card}>
            <Image 
                style={styles.icon}
                source={require('../assets/images/gallery.png')}
            />
            <Text style={styles.title}>{album.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#ff42f3",
        fontWeight: "bold"
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
    },
    icon: {
        width: 128,
        height: 128,
    }
});

export default AlbumCard