import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostsScreen from './PostsScreen';
import { LoginScreenNavigationProp } from './LoginScreen';
jest.mock('react-native-vector-icons/FontAwesome5', () => 'FontAwesome5');

describe('LoginScreen', () => {
  it('allows the user to enter an email and password', () => {
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock } as any;
    const { getByTestId, getByText } = render(<NavigationContainer><LoginScreen navigation={navigation}/></NavigationContainer>);
    const emailInput = getByTestId('UserLogin');
    const passwordInput = getByTestId('UserPassword');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password');
  });

  it ('navigates to main section after login', async () => {
    const navigateMock = jest.fn();
    const navigation = { navigate: navigateMock } as any;
    const { getByTestId } = render(<NavigationContainer><LoginScreen navigation={navigation}/></NavigationContainer>);
    const emailInput = getByTestId('UserLogin');
    const passwordInput = getByTestId('UserPassword');
    const loginButton = getByTestId('LoginButton');

    fireEvent.changeText(emailInput, 'test');
    fireEvent.changeText(passwordInput, 'test');
    fireEvent.press(loginButton);

    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Main'));
  });
});