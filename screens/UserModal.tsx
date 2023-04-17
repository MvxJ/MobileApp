import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
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

type UserModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>, 
  NativeStackNavigationProp<RootStackParamList, "UserModule">
>;

export type UserModalScreenRouteProp = RouteProp<RootStackParamList, "UserModule">;

const UserModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation();
    const {
        params: { userId }
    } = useRoute<UserModalScreenRouteProp>();
    const url = "https://jsonplaceholder.typicode.com/users/" + userId;
    const userPostsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';
    const userPhotosUrl = 'https://jsonplaceholder.typicode.com/albums?userId=';
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayUserPosts, setDisplayUserPosts] = useState<boolean>(false);
    const [displayUserAlbums, setDisplayUserAlbums] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: user?.name,
            headerTintColor: Variables.headerTextColor
        });
    });

    useEffect(() => {
        axios.get<User>(url)
        .then((response: AxiosResponse) => {
            setUser(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
        axios.get<Album[]>(userPhotosUrl + userId)
      .then((response: AxiosResponse) => {
          setAlbums(response.data);
          setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
      });
      axios.get<Post[]>(userPostsUrl + userId)
        .then((response: AxiosResponse) => {
            setPosts(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    const handleDisplayUserPosts = async () => {
        setDisplayUserPosts(!displayUserPosts);
      };
    
    const handleDisplayUserAlbums = async () => {
        setDisplayUserAlbums(!displayUserAlbums);
    };

    return (
      <SafeAreaView style={tailwind("m-2 p-2 rounded-md bg-white")}>
        <ScrollView >
          <View style={tailwind("flex flex-row justify-center items-center mt-4")}>
              <Image source={Images[userId - 1]} style={styles.avatar} />
          </View>
          <View style={tailwind("items-center mt-4")}>
              <Text style={[tailwind("text-lg font-bold"), styles.header]}>{user?.name}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.email}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.phone}</Text>
          </View>
          <View style={tailwind("mt-8")}>
              <Text style={[tailwind("text-lg font-bold mb-2"), styles.header]}>Address</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.address.street}, {user?.address.suite}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.address.city}, {user?.address.zipcode}</Text>
          </View>
          <View style={tailwind("mt-8")}>
              <Text style={[tailwind("text-lg font-bold mb-2"), styles.header]}>Company</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.company.name}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.company.catchPhrase}</Text>
          </View>
          <TouchableOpacity onPress={handleDisplayUserPosts} style={tailwind("mt-4")}>
              <Text style={[tailwind("text-lg font-bold mb-2"), styles.header]}>User posts <FontAwesome5Icon name={displayUserPosts ? 'caret-up' : 'caret-down'}/></Text>
          </TouchableOpacity>

          {
            displayUserPosts ? (
              <View>
                {
                    posts.map((post) => (
                        <PostCard post={post}></PostCard>
                    ))
                }
              </View>
            ) : (
              null
            )
          }

          <TouchableOpacity onPress={handleDisplayUserAlbums} style={tailwind("mt-4")}>
              <Text style={[tailwind("text-lg font-bold mb-2"), styles.header]}>User albums <FontAwesome5Icon name={displayUserAlbums ? 'caret-up' : 'caret-down'}/></Text>
          </TouchableOpacity>

          {
            displayUserAlbums ? (
              <FlatList
                  data={albums}
                  renderItem={({item}) => (
                    <AlbumCard {...item}></AlbumCard>
                  )}
                  numColumns={2}
                />
            ) : (
              null
            )
          }
      </ScrollView>
      </SafeAreaView>
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
}
});

export default UserModal