import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Pin} from "../components/Pin";

interface IMasonryList {
    pins:{
        id: string
        image: string
        title: string
    }[],
}

export const MasonryList = ({pins}: IMasonryList) => {
    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.column}>
                    {pins.filter((item,index)=> index % 2 === 0).map((pin)=>(
                        <Pin pin={pin} key={pin.id}/>
                    ))}
                </View>

                <View style={styles.column}>
                    {pins.filter((item,index)=> index % 2 === 1).map((pin)=>(
                        <Pin pin={pin} key={pin.id}/>
                    ))}
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
    },
    column:{
        flex: 1
    }
});