import { View, Text, Touchable, TouchableOpacity, FlatList, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native'
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
import { Post } from '../interfaces/PostInterface';

type PostModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "PostModule">
>;

type PostModalScreenRouteProp = RouteProp<RootStackParamList, "PostModule">;

const PostModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostModalScreenNavigationProp>();
    const {
        params: { postId, postBody, postTitle, autorId, likes, disLikes, removePostFunction, post, addPostFunction }
    } = useRoute<PostModalScreenRouteProp>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const url = "https://jsonplaceholder.typicode.com/comments?postId=" + postId;
    const [isLoading, setIsLoading] = useState(true);
    const [author, setAuthor] = useState<Profile>();
    const userEmail = 'Nathan@yesenia.net';
    const [displayCommentForm, setDisplayCommentForm] = useState<boolean>(false);
    const [commentBody, setCommentBody] = useState<string>('')
    const [commentTitle, setCommentTitle] = useState<string>('')

    const handleDisplayUserForm = async () => {
        setDisplayCommentForm(!displayCommentForm);
    }

    const addComment = async () => {
        setIsLoading(true);
        const request = {"postId": postId, "name": commentTitle, "email": userEmail, "body": commentBody}
        axios.post('https://jsonplaceholder.typicode.com/comments', request)
        .then((response: AxiosResponse) => {
            const comment = response.data;
            comments.unshift(comment);
            setDisplayCommentForm(false);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    const removeCommentFunction = async (comment: Comment) => {
        setIsLoading(true);
        axios.delete('https://jsonplaceholder.typicode.com/comments/' + comment.id)
        .then((response: AxiosResponse) => {
            const index = comments.indexOf(comment);
            comments.splice(index, 1);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }

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
        setIsLoading(true);
        axios.get<Post>("https://jsonplaceholder.typicode.com/posts/")
        .then((response: AxiosResponse) => {
            setPosts(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    return (
        <SafeAreaView style={tailwind("p-2 text-sm rounded-md block m-2 bg-white border-gray-700")}>
            {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <ScrollView style={styles.card}>
                        <View style={styles.headerBox}>
                            <Image source={Images[autorId -1]} style={styles.profileImage} />
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

                        <View>
                                {
                                autorId == 3 ? (
                                        <TouchableOpacity 
                                            onPress={() => {removePostFunction(post, navigation)}}
                                            >
                                            <Text style={styles.buttonText}>Delete post</Text>
                                        </TouchableOpacity>
                                ) : (
                                    null
                                )
                                }
                        </View>
                        
                        <View style={tailwind("mb-1 mt-5")}>
                            <Text style={tailwind("text-sm text-gray-700")}>Comments ({comments.length}):</Text>
                        </View>
                        
                        <TouchableOpacity onPress={handleDisplayUserForm} style={tailwind("mb-5")}>
                            <Text style={tailwind("text-sm text-gray-700")}>Add comment <FontAwesome5 name={displayCommentForm ? 'caret-up' : 'caret-down'}/></Text>
                        </TouchableOpacity>

                        { 
                            displayCommentForm ? (
                                <View style={tailwind("flex mb-5 justify-center")}>
                                    <TextInput 
                                        placeholder="Comment title..." 
                                        onChangeText={text => setCommentTitle(text)} 
                                        style={styles.commentInput}
                                    />
                                    <TextInput 
                                        placeholder='Comment body...' 
                                        onChangeText={text => setCommentBody(text)}
                                        style={styles.commentInput}
                                    />
                                    <View style={styles.addCommentWrapper}>
                                        <TouchableOpacity onPress={addComment} style={styles.addCommentButton}>
                                            <Text style={tailwind("text-white text-center")}>
                                                Add
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                null
                            )
                        }
                        
                        {comments.map((comment) => (
                            <CommentBlock comment={comment} removeComment={removeCommentFunction}></CommentBlock>
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
    },
    addCommentWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addCommentButton: {
        width: 100,
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Variables.headerTextColor
    },
    commentInput: {
        width: '90%',
        height: 25,
        margin: 5
    },
    card: {
        position: 'relative',
        top: -30,
        height: '100%'
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 40
    }
});

export default PostModal