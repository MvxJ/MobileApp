import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Button, TextInput, Keyboard, ScrollView, StyleSheet, Pressable, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Profile } from '../interfaces/ProfileInterface';
import Images from '../props/Images';
import Variables from '../props/Variables';
import { useNavigation } from '@react-navigation/native';
import { Album } from '../interfaces/AlbumInterface';
import { Post } from '../interfaces/PostInterface';
import PostCard from '../components/PostCard';
import AlbumCard from '../components/AlbumCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenProps;
};

type ProfileField = 'name' | 'username' | 'email' | 'phone' | 'website' | 'street' | 'suite' | 'city' | 'zipcode' | 'companyName' | 'catchPhrase' | 'bs' | 'company-name';

export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = ({navigation}: {navigation: ProfileScreenNavigationProp}) => {
  const tailwind = useTailwind();
  const url = 'https://jsonplaceholder.typicode.com/users/';
  const userPostsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=';
  const userPhotosUrl = 'https://jsonplaceholder.typicode.com/albums?userId=';
  const userId = 3;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayUserPosts, setDisplayUserPosts] = useState<boolean>(false);
  const [displayUserAlbums, setDisplayUserAlbums] = useState<boolean>(false);
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
    navigation?.setOptions({
        headerShown: true
    });
  });

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
      axios.get<Album[]>(userPhotosUrl + userId)
      .then((response: AxiosResponse) => {
          setAlbums(response.data);
          setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
      });
      axios.get<Post[]>(userPostsUrl + userId)
        .then((response: AxiosResponse) => {
            setPosts(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    } catch (e) {
      console.log('Error loading profile from API: ', e);
    }
  }

  const handleClearLocalData = async () => {
    try {
      await AsyncStorage.removeItem('profile');
      setLocalProfile(initialProfileState);
      dismissKeyboard();
      alert('Successfully cleared local data');
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
      alert('Successfully saved changes');
      console.log(newProfile);
    } catch (e) {
      console.log('Error saving profile data locally: ', e);
    }
  };

  const handleDisplayUserPosts = async () => {
    setDisplayUserPosts(!displayUserPosts);
  };

  const handleDisplayUserAlbums = async () => {
    setDisplayUserAlbums(!displayUserAlbums);
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
      <View style={tailwind("p-2 text-sm rounded-md block m-2 bg-gray-100")}>
        <Text style={tailwind("font-semibold")}>{label}</Text>
        <TextInput
          style={tailwind("rounded-md")}
          onChangeText={(text) => handleFieldChange(field, text)}
          value={value}
          testID={`profile-${field}-input`}
        />
      </View>
    );
  }

  const deletePost = async(post: Post, localNavigation: any) => {
    setIsLoading(true);
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + post.id)
    .then((response: AxiosResponse) => {
        const index = posts.indexOf(post);
        console.log(index);
        posts.splice(index, 1);
        setIsLoading(false);
        localNavigation.goBack();
        navigation.goBack;
    })
    .catch((error) => {
        console.log(error);
        setIsLoading(false);
        localNavigation.goBack();
        navigation.goBack;
    });
}

const addPost = async (title: string, body: string, localNavigation: any) => {
  if (title != '' && body != '') {
      setIsLoading(true);
      const request = {"title": title, "body": body, "userId": 3}
      axios.post('https://jsonplaceholder.typicode.com/posts', request)
      .then((response: AxiosResponse) => {
          const post = response.data;
          posts.unshift(post);
          localNavigation.goBack();
          navigation.goBack;
          setIsLoading(false);
      })
      .catch((error) => {
          console.log(error);
          setIsLoading(false);
          localNavigation.goBack();
          navigation.goBack;
      });
  }
}
    
  return (
    <SafeAreaView testID='PostsScreen'>
      <ScrollView style={tailwind("p-2 text-sm rounded-md block m-2 bg-white border-gray-700")}>
        <View style={tailwind("flex flex-row justify-center items-center mt-4")}>
              <Image source={Images[userId - 1]} style={styles.avatar} />
        </View>
          <Text style={[tailwind("mt-0 font-semibold"), styles.sectionHeader]}>Account information: </Text>
          {renderTextInput('Name:', localProfile.name, 'name')}
          {renderTextInput('Username:', localProfile.username, 'username')}
          {renderTextInput('Email:', localProfile.email, 'email')}
          {renderTextInput('Phone:', localProfile.phone, 'phone')}
          {renderTextInput('Website:', localProfile.website, 'website')}

          <Text style={[tailwind("mt-5 font-semibold"), styles.sectionHeader]}>Address: </Text>
          {renderTextInput('Street:', localProfile.address.street, 'street')}
          {renderTextInput('Suite:', localProfile.address.suite, 'suite')}
          {renderTextInput('City:', localProfile.address.city, 'city')}
          {renderTextInput('Zipcode:', localProfile.address.zipcode, 'zipcode')}

          <Text style={[tailwind("mt-5 font-semibold"), styles.sectionHeader]}>Company: </Text>
          {renderTextInput('Name:', localProfile.company.name, 'company-name')}
          {renderTextInput('Catch Phrase:', localProfile.company.catchPhrase, 'catchPhrase')}
          {renderTextInput('Bs:', localProfile.company.bs, 'bs')}

          <TouchableOpacity onPress={handleDisplayUserPosts}>
              <Text style={[tailwind("mt-5 font-semibold"), styles.sectionHeader]}>User posts <FontAwesome5 name={displayUserPosts ? 'caret-up' : 'caret-down'}/></Text>
          </TouchableOpacity>

          {
            displayUserPosts && userId == 3 ? (
              <View>
                <TouchableOpacity 
                  onPress={() =>
                      // @ts-ignore
                      navigation.navigate('AddPostModule', {
                          addPostFunction: addPost
                      }
                  )}
                  >
                  <Text style={styles.buttonText}>Add post</Text>
                </TouchableOpacity>
                {
                    posts.map((post) => (
                        <PostCard post={post} deletePostFunction={deletePost}></PostCard>
                    ))
                }
              </View>
            ) : (
              null
            )
          }

          <TouchableOpacity onPress={handleDisplayUserAlbums}>
              <Text style={[tailwind("mt-5 font-semibold"), styles.sectionHeader]}>User albums <FontAwesome5 name={displayUserAlbums ? 'caret-up' : 'caret-down'}/></Text>
          </TouchableOpacity>

          {
            displayUserAlbums ? (
              <FlatList
                  data={albums}
                  renderItem={({item}) => (
                    <AlbumCard {...item}></AlbumCard>
                  )}
                  numColumns={2}
                />
            ) : (
              null
            )
          }

          <View style={tailwind("text-sm rounded-md block m-2 bg-white")}>
            <Pressable style={[styles.button, styles.submitButton]} onPress={() => handleSaveProfile(localProfile)}>
              <Text style={styles.text}>Save local data</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.dangerButton]} onPress={handleClearLocalData} testID='ClearDataButton'>
              <Text style={styles.text}>Clear local data</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.dangerButton]} onPress={handleLogout} testID='LogoutButton'>
              <Text style={styles.text}>Logout</Text>
            </Pressable>
          </View>
      </ScrollView>
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  sectionHeader: {
    color: Variables.headerTextColor
  },
  dangerButton: {
    backgroundColor: Variables.dangerTextColor
  },
  submitButton: {
    backgroundColor: Variables.headerTextColor
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  header: {
    color: Variables.headerTextColor,
    fontWeight: "bold"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40
}
});

export default ProfileScreen