import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { RootStackParamList } from '../navigator/RootNavigator';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import { useTailwind } from 'tailwind-rn/dist';
import Variables from '../props/Variables';
import { Image } from 'react-native';
import Images from '../props/Images';
import { User } from '../interfaces/UserInterface';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Post } from '../interfaces/PostInterface';
import { Album } from '../interfaces/AlbumInterface';
import AlbumCard from '../components/AlbumCard';
import PostCard from '../components/PostCard';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewPostModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>, 
  NativeStackNavigationProp<RootStackParamList, "AddPostModule">
>;

export type NewPostModalScreenRouteProp = RouteProp<RootStackParamList, "AddPostModule">;

const NewPostModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation();
    const {
        params: { addPostFunction }
    } = useRoute<NewPostModalScreenRouteProp>();

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    return (
      <View>
      <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
          <Text style={[tailwind("m-5 text-xl text-right"), styles.header]}>Close</Text>
      </TouchableOpacity>
      <View style={tailwind("p-2 text-sm rounded-md block m-2 bg-gray-100")}>
      <Text style={[tailwind("mt-5 text-xl font-semibold"), styles.sectionHeader]}>Title: </Text>
      <TextInput 
          placeholder='Post title...' 
          onChangeText={(text) => setTitle(text)} 
          style={[tailwind("rounded-md"), ]}
      > 
      </TextInput>
      <Text style={[tailwind("mt-5 text-xl font-semibold"), styles.sectionHeader]}>Body: </Text>
      <TextInput 
          placeholder='Post body...' 
          onChangeText={(text) => setBody(text)} 
          style={[tailwind("rounded-md"), ]} //style do zmiany
      > 
      </TextInput>
      </View>
      

      {
          title != '' && body != '' ?
          (
            <Pressable onPress={() =>  {addPostFunction(title, body, navigation)}} style={[styles.button, styles.submitButton]}>
              <Text style={styles.text}>Add post</Text>
            </Pressable>
          ) :
          (
              null
          )
      }
      </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 75,
  },
  header: {
    color: Variables.headerTextColor,
    fontWeight: "bold"
  },
  sectionHeader: {
    color: Variables.headerTextColor
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5
  },
  submitButton: {
    backgroundColor: Variables.headerTextColor
  },
});

export default NewPostModal