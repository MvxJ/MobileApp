import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Image} from 'react-native';
import React, { useEffect } from 'react'
import {useState} from 'react'
import {useTailwind} from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Variables from '../props/Variables';
import { useNavigation } from '@react-navigation/native';

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
    const tailwind = useTailwind();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

  useEffect(() => {
    AsyncStorage.getItem('userLogged').then((value) =>{
      if (value === 'true') {
        navigation.replace('Main');
      }
    });
  }, []);


  const handleLogin = async () => {
    if (email === 'test' && password === 'test') {
      navigation.navigate('Main');
      try {
        await AsyncStorage.setItem('userLogged', 'true');
        console.log('Data saved')
      }
      catch (error) {
        console.log('An error has occured:', error)
      }
    } else {
      alert('Incorrect username or password');
  };
};

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Image style={styles.logoImage} source={require('../assets/images/logo.png')}/>
      <Text style={[tailwind('text-3xl font-bold mb-6'), styles.loginHeader]}>Login</Text>
      <View style={tailwind('w-11/12 mb-6')}>
        <TextInput
          style={tailwind('bg-gray-100 p-3 rounded-lg')}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          testID='UserLogin'
        />
      </View>
      <View style={tailwind('w-11/12 mb-6')}>
        <TextInput
          style={tailwind('bg-gray-100 p-3 rounded-lg')}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          testID='UserPassword'
        />
      </View>
      <TouchableOpacity
        style={[tailwind('py-3 px-6 rounded-lg'), styles.loginButton]}
        onPress={handleLogin}
        testID='LoginButton'
      >
        <Text style={tailwind('text-white text-lg font-bold text-center')}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create(
  {
    loginButton: {
      width: 200,
      backgroundColor: Variables.iconsActiveColor,
      textAlign: "center"
    },
    loginHeader: {
      color: Variables.headerTextColor
    },
    logoImage: {
      marginBottom: 50
    }
  }
);

export default LoginScreen;