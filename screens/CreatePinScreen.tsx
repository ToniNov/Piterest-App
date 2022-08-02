import React, {useState} from 'react';
import {Button, Image, View, TextInput, StyleSheet, Alert, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useNhostClient} from "@nhost/react";
import {useNavigation} from "@react-navigation/core";

const CREATE_PIN_MUTATION = `
mutation MyMutation ($image: String!,$title: String) {
  insert_pins(objects: {image: $image , title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}`;

export const CreatePinScreen = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    const nhost = useNhostClient();
    const navigation = useNavigation();


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    const uploadFile = async () => {
        if (!imageUri){
            return {error: {message:"No image selected"},};
        }
        // extract image name & extension
        const parts = imageUri.split('/')
        const name = parts[parts.length - 1];
        const nameParts =name.split('.');
        const extensionImage = nameParts[nameParts.length - 1];
        // Only for OS
        const uri = Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

        const result = await nhost.storage.upload({
            file:{
                name: name,
                type: `image/${extensionImage}`,
                uri,
            },
        });
        return  result;
    };

    const onSubmit = async () => {

        const uploadResult = await uploadFile();

        if(uploadResult.error){
            Alert.alert("Error uploading the image", uploadResult.error.message);
            return
        }

        const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
            title,
            image: uploadResult.fileMetadata.id,
        });

        if (result.error){
            if ("message" in result.error) {
                Alert.alert("Error creating the post", result.error.message)
            }
        } else {
          navigation.goBack();
        }
    };

    return (
        <View style={styles.root}>
            <Button title="Upload yor Pin" onPress={pickImage}/>
            {imageUri && (
                <>
                    <Image
                        source = {{uri: imageUri }}
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