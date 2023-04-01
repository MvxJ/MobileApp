import { View, Text } from 'react-native'
import React from 'react'
import { Comment } from '../interfaces/CommentInterface'
import { useTailwind } from 'tailwind-rn/dist'
import { StyleSheet } from 'react-native'
import Variables from '../props/Variables'
import { Image } from 'react-native'
import Images from '../props/Images'

const CommentBlock = (comment: Comment) => {
  const tailwind = useTailwind();
  const id = Math.floor(Math.random() * 9) + 0;

  return (
    <View style={tailwind("p-2 mb-5")} key={comment.id}>
      <View style={styles.headerBox}>
        <Image source={Images[id]} style={styles.profileImage}></Image>
        <View style={styles.authorBlock}>
          <Text style={styles.title}>{comment.name}</Text>
          <Text style={tailwind("text-gray-500")}>{comment.email}</Text>
        </View>
      </View>
      <Text style={[tailwind("text-gray-500 flex flex-row text-justify"), styles.commentBody]}>{comment.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      marginBottom: 5
  },
  title: {
    color: Variables.headerTextColor,
    fontSize: Variables.primaryTextSize,
  },
  headerBox: {
    flex: 1,
    flexDirection: "row"
  },
  commentBody: {
    width: '80%',
    position: 'relative',
    left: 65
  },
  authorBlock: {
    width: '85%'
  }
});

export default CommentBlock