import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PhotoCard from './PhotoCard';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PhotoModal from '../screens/PhotoModal';

describe('PhotoCard', () => {
  const photo = {
    albumId: 1,
    id: 1,
    title: "test",
    url: "test",
    thumbnailUrl: "test"
  };

  it('navigates to PhotoModal after clicking', async () => {
    const { getByTestId, findByText } = render(
      <NavigationContainer>
          <PhotoCard photo={photo} deletePhotoFunction={jest.fn} />
      </NavigationContainer>
    );
    const card = getByTestId("PhotoCardComponent");
    fireEvent.press(card);
    const photoTitleModal = await findByText(photo.title);

    expect(photoTitleModal).toBeDefined();
  });
});