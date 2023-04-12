import { fireEvent, render, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from './ProfileScreen';

type ProfileField = 'name' | 'username' | 'email' | 'phone' | 'website' | 'street' | 'suite' | 'city' | 'zipcode' | 'companyName' | 'catchPhrase' | 'bs';

describe('ProfileScreen', () => {
  it('allows user to change user data', () => {
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock, setOptions: jest.fn() } as any;
    const { getByTestId, getByText } = render(<NavigationContainer><ProfileScreen navigation={navigation}/></NavigationContainer>);
    const nameInput = getByTestId('profile-name-input');
    const userNameInput = getByTestId('profile-username-input');
    const emailInput = getByTestId('profile-email-input');
    const phoneInput = getByTestId('profile-phone-input');

    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(userNameInput, 'johndoe1');
    fireEvent.changeText(phoneInput, '123321123');

    expect(navigation.setOptions).toBeCalledWith({headerShown: true});
    expect(emailInput.props.value).toBe('john.doe@example.com');
    expect(nameInput.props.value).toBe('John Doe');
    expect(userNameInput.props.value).toBe('johndoe1');
    expect(phoneInput.props.value).toBe('123321123');
  });

  it ('logout user', async () => {
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock, setOptions: jest.fn() } as any;
    const { getByTestId, getByText } = render(<NavigationContainer><ProfileScreen navigation={navigation}/></NavigationContainer>);
    const logoutButton = getByTestId('LogoutButton');

    fireEvent.press(logoutButton);

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Login'));
  });
});