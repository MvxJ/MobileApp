import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Post } from '../interfaces/PostInterface'
import {useTailwind} from 'tailwind-rn';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { PostScreenNavigationProp } from '../screens/PostsScreen';
import Variables from '../props/Variables';
import Images from '../props/Images';

const PostCard = ({ post }: { post: Post }) => {
    const tailwind = useTailwind();
    const navigation = useNavigation<PostScreenNavigationProp>();
    const likes = Math.floor(Math.random() * 100) + 1;
    const disLikes = Math.floor(Math.random() * 100) + 1;

    return (
        <TouchableOpacity
            key={post.id}
            onPress={() => 
                // @ts-ignore
                navigation.navigate('PostModule', {
                    postId: post.id,
                    postBody: post.body,
                    postTitle: post.title,
                    autorId: post.userId,
                    likes: likes,
                    disLikes: disLikes
                })
            }
        >
            <View style={tailwind("p-5 text-sm rounded-md block m-2 bg-white border-gray-700")}>
                <View style={styles.headerBox}>
                    <Image style={styles.profileImage} source={Images[post.userId - 1]}/>
                    <Text style={styles.title}>{post.title}</Text>
                </View>
                <Text style={tailwind("text-start mt-5 text-gray-500")}>{post.body}</Text>
                <View style={tailwind("text-gray-500 flex flex-row")}>
                    <Text style={tailwind("block mr-5 mt-5")}>5 <FontAwesome5 name={'comments'}/></Text>
                    <Text style={tailwind("block mr-5 mt-5")}>{likes} <FontAwesome5 name={'thumbs-up'}/></Text>
                    <Text style={tailwind("block mr-5 mt-5")}>{disLikes} <FontAwesome5 name={'thumbs-down'}/></Text>
                </View>
            </View>
        </TouchableOpacity>
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
    }
});

export default PostCard