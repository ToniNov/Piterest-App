import React, {useState} from 'react';
import {Button, Image, View, TextInput, StyleSheet, Alert} from 'react-native';
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
    const [image, setImage] = useState<string | null>(null);
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
            setImage(result.uri);
        }
    };

    const onSubmit = async () => {
        const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
            title,
            image: "https://i.pinimg.com/236x/27/fa/4f/27fa4f167db6e2db8c6a81edc242a30b.jpg"
        });
        console.log(result)
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