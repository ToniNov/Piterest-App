import React, {useEffect, useState} from 'react';
import {View} from "../components/Themed";
import {Alert, Image, Pressable, StyleSheet, Text} from "react-native";

import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useNhostClient} from "@nhost/react";
import {RemoteImage} from "../components/RemoteImage";

const GET_PIN_QUERY = `
            query MyQuery ($id: uuid!) {
            pins_by_pk(id: $id) {
            created_at
            id
            image
            title
            user_id
            user {
                avatarUrl
                displayName
                id
            }
        }
    }`

export const PinScreen = () => {

    const [pin, setPin] = useState<any>(null);

    const nhost = useNhostClient();
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();

    const pinId = route.params?.id;

    const fetchPin = async (pinId: string | undefined) => {
        const response = await nhost.graphql.request(GET_PIN_QUERY, {id: pinId})
        if (response.error) {
            Alert.alert("Error fetching the pin", response.error.message)
        } else {
            setPin(response.data.pins_by_pk);
        }
    };

    useEffect(() => {
        fetchPin(pinId);
    }, [pinId])

    const goBack = () => navigation.goBack();

    if (!pin) {
        return <Text>Pin not found</Text>;
    }


    return (
        <SafeAreaView style={styles.rootBack}>
            <StatusBar style='light'/>
            <View style={styles.root}>
                <RemoteImage fileId={pin.image}/>

                <Text style={styles.title}>{pin.title}</Text>

            </View>
            <Pressable
                onPress={goBack}
                style={[styles.backBtn, {top: insets.top + 20}]}
            >
                <Ionicons name="chevron-back" size={34} color={"white"}/>
            </Pressable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rootBack: {
        backgroundColor: '#000000'
    },
    root: {
        height: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    // image: {
    //     width: '100%',
    //     borderTopLeftRadius: 50,
    //     borderTopRightRadius: 50,
    // },
    title: {
        margin: 10,
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 35,
    },
    backBtn: {
        position: "absolute",
        top: 50,
        left: 10,
    },
});