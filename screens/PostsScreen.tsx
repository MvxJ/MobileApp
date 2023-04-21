import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import {useTailwind} from 'tailwind-rn';
import { Post } from '../interfaces/PostInterface';
import axios, {AxiosResponse} from 'axios';
import PostCard from '../components/PostCard';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import Variables from '../props/Variables';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export type PostScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Posts'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const PostsScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostScreenNavigationProp>();
    const [posts, setPosts] = useState<Post[]>([])
    const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/posts');
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true
        });
    });

    useEffect(() => {
        axios.get<Post[]>(url)
        .then((response: AxiosResponse) => {
            setPosts(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    const deletePost = async(post: Post, localNavigation: any) => {
        setIsLoading(true);
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + post.id)
        .then((response: AxiosResponse) => {
            const index = posts.indexOf(post);
            console.log(index);
            posts.splice(index, 1);
            setIsLoading(false);
            localNavigation.goBack();
            navigation.goBack;
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            localNavigation.goBack();
            navigation.goBack;
        });
    }

    const addPost = async (title: string, body: string, localNavigation: any) => {
        if (title != '' && body != '') {
            setIsLoading(true);
            const request = {"title": title, "body": body, "userId": 3}
            axios.post('https://jsonplaceholder.typicode.com/posts', request)
            .then((response: AxiosResponse) => {
                const post = response.data;
                posts.unshift(post);
                localNavigation.goBack();
                navigation.goBack;
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                localNavigation.goBack();
                navigation.goBack;
            });
        }
      }

    return (
        <SafeAreaView style={[tailwind('p-2')]}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView >
                    <View style={[tailwind('flex-grow rounded-md m-2 mb-0 p-2'), styles.searchBox]}>
                        <TextInput 
                            style={tailwind('flex-grow ml-2')}
                            placeholder='Search...'
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>

                    <View>
                        {
                            posts.filter((post) => post.body.toLowerCase().includes(searchQuery.toLowerCase()) || post.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                                <PostCard post={post} deletePostFunction={deletePost}></PostCard>
                            ))
                        }
                    </View>
                </ScrollView>
            )}
            <TouchableOpacity style={styles.addButton}
                onPress={() =>
                    // @ts-ignore
                    navigation.navigate('AddPostModule', {
                        addPostFunction: addPost
                    }
                )}
            >
                <FontAwesome5 name={'plus'} style={styles.addPostIcon}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewStyles: {
        backgroundColor: Variables.viewBackground
    },
    searchBox: {
        height: 32,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: Variables.iconsActiveColor,
        borderRadius: 50,
        width: 60,
        height: 60,
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      addPostIcon: {
        color: '#fff',
        fontSize: 24,
      },
});

export default PostsScreen