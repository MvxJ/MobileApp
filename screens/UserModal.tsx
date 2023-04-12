import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { RootStackParamList } from '../navigator/RootNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import { useTailwind } from 'tailwind-rn/dist';
import Variables from '../props/Variables';
import { Image } from 'react-native';
import Images from '../props/Images';
import { User } from '../interfaces/UserInterface';


type UserModalScreenRouteProp = RouteProp<RootStackParamList, "UserModule">;

const UserModal = () => {
    const tailwind = useTailwind();
    const navigation = useNavigation();
    const {
        params: { userId }
    } = useRoute<UserModalScreenRouteProp>();
    const url = "https://jsonplaceholder.typicode.com/users/" + userId;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTintColor: Variables.headerTextColor
        });
    });

    useEffect(() => {
        axios.get<User>(url)
        .then((response: AxiosResponse) => {
            setUser(response.data);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
        });
    }, []);

    return (
      <View style={tailwind("p-2")}>
        <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                <Text style={[tailwind("m-5 text-xl text-right"), styles.header]}>Close</Text>
            </TouchableOpacity>
          <View style={tailwind("flex flex-row justify-center items-center mt-4")}>
              <Image source={Images[userId]} style={styles.avatar} />
          </View>
          <View style={tailwind("items-center mt-4")}>
              <Text style={tailwind("text-lg font-bold")}>{user?.name}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.email}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.phone}</Text>
          </View>
          <View style={tailwind("mt-8")}>
              <Text style={tailwind("text-lg font-bold mb-2")}>Address</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.address.street}, {user?.address.suite}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.address.city}, {user?.address.zipcode}</Text>
          </View>
          <View style={tailwind("mt-8")}>
              <Text style={tailwind("text-lg font-bold mb-2")}>Company</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.company.name}</Text>
              <Text style={tailwind("text-gray-500 text-sm")}>{user?.company.catchPhrase}</Text>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 75,
  },
  header: {
    color: Variables.headerTextColor,
    fontWeight: "bold"
}
});

export default UserModal