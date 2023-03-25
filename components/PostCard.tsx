import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Post } from '../interfaces/PostInterface'
import {useTailwind} from 'tailwind-rn';

const PostCard = (post: Post) => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-5 text-sm rounded-md border-2 block mt-2")}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={tailwind("text-start mt-5")}>{post.body}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#ff42f3",
        fontWeight: "bold"
    }
});

export default PostCard