import React, {FC, useEffect, useState} from 'react';
import {Text, View} from "./Themed";
import {Image, Pressable, StyleSheet} from "react-native";
import {PinPropsType} from "../screens/HomeScreen";
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

type PropsType = {
    pin: PinPropsType
}

export const Pin = (props: any) => {

    const {id, image, title} = props.pin

    const [ratio, setRatio] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        if (image) {
            Image.getSize(image, (width, height) => setRatio(width / height));
        }
    }, [image])

    const onLike = () => {
    };

    const goToPinPage = () => {
        navigation.navigate("Pin", {id});
    };

    return (
        <Pressable onPress={goToPinPage} style={styles.pin}>

            <View>
                <Image style={[styles.image,{aspectRatio:ratio} ]}
                       source={{uri:image}}/>
                <Pressable style={styles.heartButton} onPress={onLike} >
                    <AntDesign name="hearto" size={24} color="black"/>
                </Pressable>
            </View>

            <Text style={styles.title} numberOfLines={2} >
                {title}
            </Text>

        </Pressable>
    );
};


const styles = StyleSheet.create({
    pin: {
        width: '100%',
        padding: 4,
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        margin: 5,
        color: '#181818',
    },
    image: {
        width: '100%',
        borderRadius: 15,
        aspectRatio: 1 / 2,
    },
    heartButton: {
        backgroundColor: '#d4d1d5',
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 5,
        borderRadius: 50,
    },
});