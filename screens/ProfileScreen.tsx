import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Button, TextInput, Keyboard, ScrollView, StyleSheet, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Profile } from '../interfaces/ProfileInterface';
import Images from '../props/Images';
import Variables from '../props/Variables';

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenProps;
};

type ProfileField = 'name' | 'username' | 'email' | 'phone' | 'website' | 'street' | 'suite' | 'city' | 'zipcode' | 'companyName' | 'catchPhrase' | 'bs';

const ProfileScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const url = 'https://jsonplaceholder.typicode.com/users/';
  const userId = 3;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [localProfile, setLocalProfile] = useState<Profile>({
    id: userId,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const initialProfileState = {
    id: userId,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('userLogged');
    navigation.navigate('Login');
  };

  const loadProfileFromApi = async () => {
    try {
      const response = await axios.get<Profile>(url + userId);
      setProfile(response.data);
    } catch (e) {
      console.log('Error loading profile from API: ', e);
    }
  }

  const handleClearLocalData = async () => {
    try {
      await AsyncStorage.removeItem('profile');
      setLocalProfile(initialProfileState);
      dismissKeyboard();
      alert('Success');
      await loadProfileFromApi();
    } catch (e) {
      console.log('Error clearing local profile data: ', e);
    }
  };

  const handleFieldChange = (field: ProfileField, value: string) => {
    setLocalProfile({ 
      ...localProfile, 
      [field]: value,
      address: {
        ...localProfile.address,
        [field]: value,
      },
      company: {
        ...localProfile.company,
        [field]: value,
      }
    });
    console.log(localProfile)
  };
  
  

  const handleSaveProfile = async (newProfile: Profile) => {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(newProfile));
      setLocalProfile(newProfile);
      dismissKeyboard();
      alert('Success');
      console.log(newProfile);
    } catch (e) {
      console.log('Error saving profile data locally: ', e);
    }
  };

  useEffect(() => {
    const loadProfileFromStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('profile');
        if (jsonValue !== null) {
          const savedProfile = JSON.parse(jsonValue);
          setLocalProfile(savedProfile);
        } else {
          await loadProfileFromApi();
        }
      } catch (e) {
        console.log('Error loading profile data from storage: ', e);
      }
    }
    loadProfileFromStorage();
  }, []);
  
  useEffect(() => {
    if (profile) {
      setLocalProfile({ ...localProfile, ...profile });
    }
  }, [profile]);

  const renderTextInput = (label: string, value: string, field: ProfileField) => {
    return (
      <View style={tailwind("p-2 text-sm rounded-md block m-2 bg-white")}>
        <Text style={tailwind("font-semibold")}>{label}</Text>
        <TextInput
          style={tailwind("rounded-md")}
          onChangeText={(text) => handleFieldChange(field, text)}
          value={value}
        />
      </View>
    );
  }
    
  return (
    <SafeAreaView>
      <ScrollView style={tailwind("p-2")}>
        <View style={tailwind("flex flex-row justify-center items-center mt-4")}>
              <Image source={Images[userId]} style={styles.avatar} />
        </View>
          {renderTextInput('Name:', localProfile.name, 'name')}
          {renderTextInput('Username:', localProfile.username, 'username')}
          {renderTextInput('Email:', localProfile.email, 'email')}
          {renderTextInput('Phone:', localProfile.phone, 'phone')}
          {renderTextInput('Website:', localProfile.website, 'website')}

          <Text style={tailwind("mt-5 font-semibold")}>Address: </Text>
          {renderTextInput('Street:', localProfile.address.street, 'street')}
          {renderTextInput('Suite:', localProfile.address.suite, 'suite')}
          {renderTextInput('City:', localProfile.address.city, 'city')}
          {renderTextInput('Zipcode:', localProfile.address.zipcode, 'zipcode')}

          <Text style={tailwind("mt-5 font-semibold")}>Company: </Text>
          {renderTextInput('Name:', localProfile.company.name, 'name')}
          {renderTextInput('Catch Phrase:', localProfile.company.catchPhrase, 'catchPhrase')}
          {renderTextInput('Bs:', localProfile.company.bs, 'bs')}

          <View style={tailwind("p-2 text-sm rounded-md block m-2 bg-white")}>
            <Button title='Save local data' onPress={() => handleSaveProfile(localProfile)} />
            <Button title='Clear local data' onPress={handleClearLocalData} />
            <Button title='Logout' onPress={handleLogout} />
          </View>
      </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  header: {
      color: Variables.headerTextColor,
      fontWeight: "bold"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
},
});


export default ProfileScreen