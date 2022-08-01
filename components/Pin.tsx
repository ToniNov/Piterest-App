import React, {FC} from 'react';
import {Text, View} from "./Themed";
import {Image, Pressable, StyleSheet} from "react-native";
import {PinPropsType} from "../screens/HomeScreen";
import {AntDesign} from '@expo/vector-icons';

type PropsType = {
    pin: PinPropsType
}

export const Pin: FC<PropsType> = ({pin}) => {
    return (
        <View style={styles.pin}>
            <Image style={styles.image}
                   source={{uri: pin.image}}/>
            <Pressable>
                <AntDesign name="hearto" size={24} color="black"/>
            </Pressable>

            <Text style={styles.title}>{pin.title}</Text>

        </View>
    );
};


const styles = StyleSheet.create({
    pin: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 25,
    }
});