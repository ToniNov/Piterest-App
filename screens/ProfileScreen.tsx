import {Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {MasonryList} from "../constants/MasonryList";
import pins from "../assets/data/pins";
import {Entypo, Feather} from "@expo/vector-icons";
import {useSignOut} from "@nhost/react";

export default function ProfileScreen() {
    const {signOut} = useSignOut();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icons}>
                    <Pressable  onPress={signOut}>
                        <Feather name="share" size={24} color="black" style={styles.icon} />
                    </Pressable>
                    <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                </View>
                <Image style={styles.image}
                       source={{uri: "https://res.cloudinary.com/jerrick/image/upload/v1621833776/60ab3830cdfa36001e16ab3e.jpg"}}/>
                <Text style={styles.title}>Toni Novik</Text>
                <Text style={styles.subTitle}>145 Followers | 575 Followings</Text>
            </View>

            <MasonryList pins={pins}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
       width: "100%",
    },
    header: {
       alignItems: "center"
    },
    icons:{
        flexDirection:"row",
        alignSelf: "flex-end",
        padding: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    image: {
        width: 200,
        aspectRatio: 1,
        borderRadius: 200,
        marginVertical:10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    subTitle: {
        color: "#181818",
        fontWeight: "600",
        margin: 10,
    },
});
