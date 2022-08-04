import React, {useState} from 'react';
import {Text, View} from "./Themed";
import {Pressable, StyleSheet} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {RemoteImage} from "./RemoteImage";

// type PropsType = {
//     pin: PinPropsType
// }

export const Pin = (props: any) => {

    const {id, image, title} = props.pin

    const navigation = useNavigation();

    const [isLike,setIssLike] = useState(false)

    const onLike = () => {
        setIssLike(!isLike)
    };

    const goToPinPage = () => {
        navigation.navigate("Pin", {id});
    };

    return (
        <Pressable onPress={goToPinPage} style={styles.pin}>

            <View>
                <RemoteImage fileId={image}/>
                <Pressable style={styles.heartButton} onPress={onLike}>
                    {isLike ?
                        <AntDesign name="heart" size={24} color="red"/>
                        :  <AntDesign name="heart" size={24} color="black"/>
                    }
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
    heartButton: {
        backgroundColor: '#d4d1d5',
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 5,
        borderRadius: 50,
    },
});