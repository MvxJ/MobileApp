import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import axios, { AxiosResponse } from 'axios';
import { Profile } from '../interfaces/ProfileInterface';

const ProfileScreen = () => {
    const tailwind = useTailwind();
    const [profile, setProfile] = useState<Profile>();
    const url = "https://jsonplaceholder.typicode.com/users/";
    const userId = 3;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get<Profile[]>(url + userId)
        .then((response: AxiosResponse) => {
            setProfile(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    return (
        <SafeAreaView>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={tailwind("p-2 text-sm rounded-md block m-2 bg-white border-gray-700")}>
                    <Text style={tailwind("font-semibold")}>Account information: </Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.name : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.username : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.email : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.phone : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.website : ''}</Text>
                    <Text style={tailwind("mt-5 font-semibold")}>Address: </Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.address.street : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.address.suite : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.address.city : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.address.zipcode : ''}</Text>
                    <Text style={tailwind("mt-5 font-semibold")}>Company: </Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.company.name : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.company.catchPhrase : ''}</Text>
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{profile ? profile.company.bs : ''}</Text>
                </View>
            )}
        </SafeAreaView>
    )
}

export default ProfileScreen