import { View, Text, Touchable, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios, { AxiosResponse } from 'axios';
import CommentBlock from '../components/CommentBlock';
import { Comment } from '../interfaces/CommentInterface';
import { useTailwind } from 'tailwind-rn/dist';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "PostModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "PostModule">;

const PostModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostModalScreenNavigationProp>();
    const {
        params: { postId, postBody, postTitle, autorId }
    } = useRoute<PostModalScreenRouteProp>();
    const [comments, setComments] = useState<Comment[]>([])
    const url = "https://jsonplaceholder.typicode.com/comments?postId=" + postId;

    useEffect(() => {
        axios.get<Comment[]>(url)
        .then((response: AxiosResponse) => {
            setComments(response.data);
        });
    }, []);

    return (
        <SafeAreaView style={tailwind("p-2")}>
            <View>
                <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                    <Text>Close</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{postTitle}</Text>
                <Text>{postBody}</Text>
                <Text style={tailwind("mt-5 mb-5")}>Comments:</Text>
                {comments.map((comment) => (
                        <CommentBlock {...comment}></CommentBlock>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#ff42f3",
        fontWeight: "bold",
        marginBottom: 5
    }
});

export default PostModal