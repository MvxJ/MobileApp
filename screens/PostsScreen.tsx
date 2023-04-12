import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet, TextInput } from 'react-native'
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

    return (
        <SafeAreaView>
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
                                <PostCard post={post}></PostCard>
                            ))
                        }
                    </View>
                </ScrollView>
            )}
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
    }
});

export default PostsScreen