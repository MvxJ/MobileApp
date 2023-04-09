import { View, SafeAreaView, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react'
import {useState} from 'react'
import {useTailwind} from 'tailwind-rn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import { User } from '../interfaces/UserInterface';
import UserCard from '../components/UserCard';
import Variables from '../props/Variables';
import { Icon } from 'react-native-vector-icons/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export type UserScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, 'Users'>, 
    NativeStackNavigationProp<RootStackParamList>
>;

const UsersScreen = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation<UserScreenNavigationProp>();
    const [users, setUsers] = useState<User[]>([])
    const url = "https://jsonplaceholder.typicode.com/users";

    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true
        });
    });

    useEffect(() => {
        axios.get<User[]>(url)
        .then((response: AxiosResponse) => {
            setUsers(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    return (
        <SafeAreaView>
                      <View style={tailwind('flex flex-row items-center bg-gray-200 p-2 rounded-md')}>
                <TextInput
                    style={tailwind('flex-grow ml-2')}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <View style={tailwind('p-2')}>
                    <FontAwesome5 name={'search'}/>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView >
                    <View>
                    {users
                            .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((user) => (
                                <UserCard {...user} />
                            ))
                        }
                    </View>
                </ScrollView>   
            )}
        </SafeAreaView>
    )
}

export default UsersScreen;