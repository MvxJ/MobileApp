jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { render } from '@testing-library/react-native';
import PostCard from './PostCard';


describe('PostCard', () => {
    it('should contains requaired fields', () => {
        const post = {
            userId: 1,
            id: 1,
            title: "Post Title",
            body: "lorem ipsum"
        }
        const { getByText, getByTestId } = render(<NavigationContainer><PostCard post={post} /></NavigationContainer>);
        const title = getByText(post.title);
        const body = getByText(post.body);
        expect(title).toBeDefined();
        expect(body).toBeDefined();
    });
});