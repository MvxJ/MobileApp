import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Post } from '../interfaces/PostInterface'
import {useTailwind} from 'tailwind-rn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PostCard = (post: Post) => {
    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-5 text-sm rounded-md block m-2 bg-white border-gray-700")}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={tailwind("text-start mt-5 text-gray-500")}>{post.body}</Text>
            <View style={tailwind("text-gray-500 flex flex-row")}>
                <FontAwesome5 name={'comments'} style={tailwind("block mr-5 mt-5")}/>
                <FontAwesome5 name={'thumbs-up'} style={tailwind("block mr-5 mt-5")}/>
                <FontAwesome5 name={'thumbs-down'} style={tailwind("block mr-5 mt-5")}/>
            </View>
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