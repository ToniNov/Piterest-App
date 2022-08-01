import React, {useState} from 'react';
import {Button, Image, View, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const CreatePinScreen = () => {
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState("");


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const onSubmit = () => {

    };

    return (
        <View style={styles.root}>
            <Button title="Upload yor Pin" onPress={pickImage}/>
            {image && (
                <>
                    <Image
                        source = {{uri: image }}
                        style = {styles.image}
                    />
                    <TextInput
                        placeholder="Title..."
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Button title="Submit Pin" onPress={onSubmit}/>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image:{
        width: '100%',
        aspectRatio: 1,
        marginVertical: 10,
    },
    input:{
        borderWidth: 1,
        borderColor: "#747373",
        padding: 5,
        width: '100%',
        borderRadius: 5
    },
});