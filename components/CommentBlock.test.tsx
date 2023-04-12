import React from 'react';
import { render } from '@testing-library/react-native';
import CommentBlock from './CommentBlock';

describe('CommentBlock', () => {
  it('should contains all requaired fields', () => {
    const comment = {
      postId: 1,
      id: 1,
      name: "John Doe",
      email: "example@info.com",
      body: "Lorem ipsum"
    }
    const { getByText } = render(<CommentBlock {...comment} />);
    const text = getByText(comment.body);
    const userEmail = getByText(comment.email);
    const userName = getByText(comment.name);
    expect(text).toBeDefined();
    expect(userEmail).toBeDefined();
    expect(userName).toBeDefined();
  });
});