import React, {FC, useEffect, useState} from 'react';
import {Text, View} from "./Themed";
import {Image, Pressable, StyleSheet} from "react-native";
import {PinPropsType} from "../screens/HomeScreen";
import {AntDesign} from '@expo/vector-icons';

type PropsType = {
    pin: PinPropsType
}

export const Pin: FC<PropsType> = ({pin}) => {

    const [ratio, setRatio] = useState(1)

    const onLike =()=> {};

    useEffect(()=> {
        if (pin.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height));
        }
    },[pin.image])


    return (
        <View style={styles.pin}>

            <View>
                <Image style={[styles.image,{aspectRatio:ratio} ]}
                       source={{uri: pin.image}}/>
                <Pressable style={styles.heartButton} onPress={onLike} >
                    <AntDesign name="hearto" size={24} color="black"/>
                </Pressable>
            </View>

            <Text style={styles.title} numberOfLines={2} >
                {pin.title}
            </Text>

        </View>
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