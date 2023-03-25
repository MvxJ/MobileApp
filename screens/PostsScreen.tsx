import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useTailwind} from 'tailwind-rn';
import { Post } from '../interfaces/PostInterface';
import axios, {AxiosResponse} from 'axios';
import PostCard from '../components/PostCard';

const PostsScreen = () => {
    const tailwind = useTailwind();
    const [posts, setPosts] = useState<Post[]>([])
    const url = "https://jsonplaceholder.typicode.com/posts"

    useEffect(() => {
        axios.get<Post[]>(url)
        .then((response: AxiosResponse) => {
            setPosts(response.data);
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={tailwind("p-2")}>
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