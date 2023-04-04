import { View, Text, Touchable, TouchableOpacity, FlatList, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Variables from '../props/Variables';
import { Profile } from '../interfaces/ProfileInterface';
import { Image } from 'react-native';
import Images from '../props/Images';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "PostModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "PostModule">;

const PostModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostModalScreenNavigationProp>();
    const {
        params: { postId, postBody, postTitle, autorId, likes, disLikes }
    } = useRoute<PostModalScreenRouteProp>();
    const [comments, setComments] = useState<Comment[]>([]);
    const url = "https://jsonplaceholder.typicode.com/comments?postId=" + postId;
    const [isLoading, setIsLoading] = useState(true);
    const [author, setAuthor] = useState<Profile>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: postTitle,
            headerTintColor: Variables.headerTextColor
        });
    });

    useEffect(() => {
        axios.get<Comment[]>(url)
        .then((response: AxiosResponse) => {
            setComments(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
        setIsLoading(true);
        axios.get<Profile>("https://jsonplaceholder.typicode.com/users/" + autorId)
        .then((response: AxiosResponse) => {
            setAuthor(response.data);
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
                    <ScrollView style={tailwind("p-2 text-sm rounded-md block m-2 bg-white border-gray-700")}>
                        <View style={styles.headerBox}>
                            <Image source={Images[autorId]} style={styles.profileImage} />
                            <View style={styles.title}>
                                <Text style={[tailwind("font-extrabold"), styles.authorColor]}>{author?.name}</Text>
                                <Text style={tailwind("text-gray-500")}>{author?.email}</Text>
                            </View>
                        </View>
                        <Text style={tailwind("text-base mt-5")}>{postBody}</Text>
                        <View style={tailwind("text-gray-500 flex flex-row")}>
                            <Text style={tailwind("block mr-5 mt-5")}>{likes} <FontAwesome5 name={'thumbs-up'}/></Text>
                            <Text style={tailwind("block mr-5 mt-5")}>{disLikes} <FontAwesome5 name={'thumbs-down'}/></Text>
                        </View>
                        <Text style={tailwind("mb-5 mt-5 text-sm text-gray-700")}>Comments (5):</Text>
                        {comments.map((comment) => (
                            <CommentBlock {...comment}></CommentBlock>
                        ))}
                    </ScrollView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Variables.headerTextColor,
        fontWeight: "bold",
        fontSize: Variables.headerTextSize,
        width: '75%'
    },
    headerBox: {
        flex: 1,
        flexDirection: "row"
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15
    },
    authorColor: {
        color: Variables.headerTextColor
    }
});

export default PostModal