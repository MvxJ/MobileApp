import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import PostModal from '../screens/PostModal';
import AlbumModal from '../screens/AlbumModal';
import PhotoModal from '../screens/PhotoModal';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Variables from '../props/Variables';

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Profile: {userId: string}
    Posts: {order: any}
    Albums: {order: any};
    PostModule: {postId: number, postBody: string, postTitle: string, autorId: number, likes: number, disLikes: number}
    AlbumModule: {albumId: number, albumTitle: string}
    PhotoModule: {photoUrl: string, photoTitle: string}
}

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        gestureEnabled: false, // Disable swipe gesture
      }}>
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Group>
            <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{
            presentation: "card",
        }}>
          <RootStack.Screen name="PostModule" component={PostModal} options={{headerShown: false}}/>
          <RootStack.Screen name="AlbumModule" component={AlbumModal} options={{headerShown: false}} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{
            presentation: "modal"
        }}>
            <RootStack.Screen name="PhotoModule" component={PhotoModal} options={{headerShown: false}}/>
        </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator