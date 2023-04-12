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
import Variables from '../props/Variables';

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
            key={album.id}
        >
            <View>
                <View style={styles.icon}>
                    <Image 
                        source={require('../assets/images/folder.png')}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.title}>{album.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Variables.headerTextColor,
        fontWeight: "bold",
        display: "flex",
        height: 50,
        textAlign: "center"
    },
    card: {
        flex: 1, 
        flexDirection: "column", 
        margin: 4,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderColor: "lightgray",
        padding: 4,
        maxWidth: '50%'
    },
    icon: {
        flex: 1,
        width: 128,
        height: 128
    },
    image: {
        marginLeft: 20
    }
});

export default AlbumCard