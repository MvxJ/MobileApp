import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { Album } from '../interfaces/AlbumInterface';
import { BackgroundImage } from '@rneui/base';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';

export type PostScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'AlbumModal'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const AlbumCard = (album: Album) => {
    const tailwind = useTailwind();
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => 
                // @ts-ignore
                navigation.navigate('AlbumModule', {
                    albumId: album.id,
                    albumTitle: album.title
                })
            }
            style={styles.card}
        >
            <View>
                <Image 
                    style={styles.icon}
                    source={require('../assets/images/gallery.png')}
                />
                <Text style={styles.title}>{album.title}</Text>
            </View>
        </TouchableOpacity>
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