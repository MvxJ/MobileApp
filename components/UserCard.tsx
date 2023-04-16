import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {useTailwind} from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
import { User } from '../interfaces/UserInterface';
import { UserScreenNavigationProp } from '../screens/UsersScreen';
import Images from '../props/Images';

const UserCard = (user: User) => {
    const tailwind = useTailwind();
    const navigation = useNavigation<UserScreenNavigationProp>();

    return (
        <TouchableOpacity
            key={user.id}
            onPress={() => 
                // @ts-ignore
                navigation.navigate('UserModule', {
                    userId: user.id,
                    username: user.name
                })
            }
        >
            <View style={tailwind("p-5 text-sm rounded-md block m-2 bg-white border-gray-700")}>
                <View style={styles.headerBox}>
                    <Image source={Images[user.id - 1]} style={styles.profileImage} />
                    <Text style={tailwind("text-start mt-5 text-gray-500")}>{user.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerBox: {
        flex: 1,
        flexDirection: "row"
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 25,
        marginRight: 65
    }
});

export default UserCard