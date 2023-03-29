import { View, Text, SafeAreaView, ScrollView } from 'react-native'
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

export type PostScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Posts'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const PostsScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostScreenNavigationProp>();
    const [posts, setPosts] = useState<Post[]>([])
    const url = "https://jsonplaceholder.typicode.com/posts"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    });

    useEffect(() => {
        axios.get<Post[]>(url)
        .then((response: AxiosResponse) => {
            setPosts(response.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={tailwind("p-1")}>
                <View>
                    {posts.map((post) => (
                        <PostCard {...post}></PostCard>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostsScreen