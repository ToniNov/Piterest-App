import React from 'react';
import {ScrollView, StyleSheet, useWindowDimensions, View} from "react-native";
import {Pin} from "../components/Pin";

interface IMasonryList {
    pins: {
        id: string
        image: string
        title: string
    }[],
}

export const MasonryList = ({pins}: IMasonryList) => {

    // Column view
    const width = useWindowDimensions().width;
    const numColumns = Math.ceil(width / 340);

    return (
        <ScrollView contentContainerStyle={{width: "100%"}}>
            <View style={styles.container}>

                {Array.from(Array(numColumns)).map((_, colIndex) => (
                    <View key={`column_${colIndex}`} style={styles.column}>
                        {pins
                            .filter((_, index) => index % numColumns === colIndex)
                            .map((pin) => (
                                <Pin pin={pin} key={pin.id}/>
                            ))}
                    </View>
                ))}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
    },
    column: {
        flex: 1
    }
});