import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import AlbumsScreen from '../screens/AlbumsScreen';
import Variables from '../props/Variables';
import UsersScreen from '../screens/UsersScreen';

export type TabStackParamList = {
    Profile: undefined;
    Posts: undefined;
    Albums: undefined;
    Users: undefined;
    PostModal: undefined;
    AlbumModal: undefined;
    PhotoModal: undefined;
    PhotoModule: undefined;
    UserModule: undefined;
    NewPostModule: undefined;
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
            tabBarActiveTintColor: Variables.iconsActiveColor,
            tabBarInactiveTintColor: Variables.iconsInactiveColor,
            headerTitleStyle: styles.headerNavigation,

            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Profile') {
                    // @ts-ignore
                    return <Icon name="user" type="entypo" color={focused ? Variables.iconsActiveColor : Variables.iconsInactiveColor}/>
                } else if (route.name === "Posts") {
                    // @ts-ignore
                    return <Icon name="list" type="entypo" color={focused ? Variables.iconsActiveColor : Variables.iconsInactiveColor}/>
                } else if (route.name === "Albums") {
                    return <Icon name="grid" type="entypo" color={focused ? Variables.iconsActiveColor : Variables.iconsInactiveColor}/>
                }
                else if (route.name === "Users") {
                    return <Icon name="users" type="entypo" color={focused ? Variables.iconsActiveColor : Variables.iconsInactiveColor}/>
                }
            }
        })}>
            <Tab.Screen name="Posts" component={PostsScreen} />
            <Tab.Screen name="Albums" component={AlbumsScreen} />
            <Tab.Screen name="Users" component={UsersScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerNavigation: {
        color: Variables.headerTextColor
    }
});

export default TabNavigator