import React, {useEffect, useState} from 'react';
import {View} from "../components/Themed";
import {Image, Pressable, StyleSheet, Text} from "react-native";

import pins from "../assets/data/pins";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";

export const PinScreen = () => {

    const pin = pins[0];
    const [ratio, setRatio] = useState(1);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (pin.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height));
        }
    }, [pin.image])

    const goBack = () => {

    }

    return (
        <SafeAreaView style={styles.rootBack}>
            <StatusBar style='light' />
            <View style={styles.root}>
                <Image source={{uri: pin.image}}
                       style={[styles.image, {aspectRatio: ratio}]}/>
                <Text style={styles.title}>{pin.title}</Text>

            </View>
            <Pressable
                onPress={goBack}
                style={[styles.backBtn,{top: insets.top + 20}]}
            >
                <Ionicons name="chevron-back" size={34} color={"white"} />
            </Pressable>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rootBack:{
        backgroundColor: '#000000'
    },
    root: {
        height: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    image: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    title: {
       margin: 10,
       fontSize: 24,
       fontWeight: "600",
        textAlign: "center",
        lineHeight: 35,
    },
    backBtn:{
      position:"absolute",
      top: 50,
      left: 10,
    },
});