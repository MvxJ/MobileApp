import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import AlbumsScreen from '../screens/AlbumsScreen';

export type TabStackParamList = {
    Profile: undefined;
    Posts: undefined;
    Albums: undefined;
    PostModal: undefined;
    AlbumModal: undefined;
    PhotoModal: undefined;
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    });

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: "#ff42f3",
            tabBarInactiveTintColor: "lightgray",
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Profile') {
                    // @ts-ignore
                    return <Icon name="user" type="entypo" color={focused ? "#ff42f3" : "lightgray"}/>
                } else if (route.name === "Posts") {
                    // @ts-ignore
                    return <Icon name="list" type="entypo" color={focused ? "#ff42f3" : "lightgray"}/>
                } else if (route.name === "Albums") {
                    return <Icon name="grid" type="entypo" color={focused ? "#ff42f3" : "lightgray"}/>
                }
            }
        })}>
            <Tab.Screen name="Posts" component={PostsScreen} />
            <Tab.Screen name="Albums" component={AlbumsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator