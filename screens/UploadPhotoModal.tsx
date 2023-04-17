import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import Variables from '../props/Variables';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type AddPhotoModalScreen = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>, 
    NativeStackNavigationProp<RootStackParamList, "AddPhotoModule">
>;

type AddPhotoModalScreenRouteProp = RouteProp<RootStackParamList, "AddPhotoModule">;

const UploadPhotoModal = () => {
    const navigation = useNavigation();
    const tailwind = useTailwind();
    const {
        params: { uploadPhotoFunction }
    } = useRoute<AddPhotoModalScreenRouteProp>();
    const [imageUri, setImageUri] = useState<string>('');
    const [photoTitle, setPhotoTitle] = useState<string>('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={navigation.goBack} style={tailwind("mb-5")}>
                <Text style={[tailwind("m-5 text-xl text-right"), styles.header]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={[tailwind("rounded-md text-center"), styles.backgroundBlue]}>
                <Text style={[tailwind("text-center text-white"), styles.lineHeightCenter]}>
                    Select Image <FontAwesome5Icon name={'images'}/>
                </Text>
            </TouchableOpacity>
            <TextInput 
                placeholder='Image title...' 
                onChangeText={(text) => setPhotoTitle(text)} 
                style={[tailwind("rounded-md"), styles.titleInput]}
            > 
            </TextInput>
            { imageUri ? 
                (
                    <Image source={{ uri: imageUri }} style={[styles.image, tailwind('rounded-md')]}></Image>
                ) :
                (
                    <View style={[styles.imagePlaceholder, tailwind('rounded-md')]}>
                    </View>
                )
            }

            {
                imageUri != '' && photoTitle != '' ?
                (
                    <TouchableOpacity onPress={() =>  {uploadPhotoFunction(imageUri, photoTitle, navigation)}} style={[tailwind("rounded-md text-center"), styles.backgroundBlue]}>
                        <Text style={[tailwind("text-center text-white"), styles.lineHeightCenter]}>
                            Upload Photo <FontAwesome5Icon name={'upload'} />
                            </Text>
                    </TouchableOpacity>
                ) :
                (
                    null
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 75,
    },
    header: {
      color: Variables.headerTextColor,
      fontWeight: "bold"
    },
    backgroundBlue: {
        backgroundColor: Variables.headerTextColor,
        height: 35,
        margin: 5
    },
    lineHeightCenter: {
        lineHeight: 40
    },
    imagePlaceholder: {
        height: 400,
        backgroundColor: 'lightgray',
        margin: 5
    },
    image: {
        height: 400,
        margin: 5
    },
    titleInput: {
        height: 35,
        padding: 5
    }
});

export default UploadPhotoModal