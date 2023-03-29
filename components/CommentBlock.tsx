import { View, Text } from 'react-native'
import React from 'react'
import { Comment } from '../interfaces/CommentInterface'
import { useTailwind } from 'tailwind-rn/dist'

const CommentBlock = (comment: Comment) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("p-2 text-gray-500 text-start")}>
      <Text>{comment.body}</Text>
    </View>
  )
}

export default CommentBlock