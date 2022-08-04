import {ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {MasonryList} from "../constants/MasonryList";
import pins from "../assets/data/pins";
import {Entypo, Feather} from "@expo/vector-icons";
import {useNhostClient, useSignOut, useUserId} from "@nhost/react";
import {useEffect, useState} from "react";

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}`


export default function ProfileScreen() {
    const [user,setUser] = useState()

    const {signOut} = useSignOut();
    const nhost = useNhostClient();

    const userId = useUserId();

    const fetchUserData = async ()=> {
        const result = await nhost.graphql.request(GET_USER_QUERY, {id: userId})
        if (result.error) {
            Alert.alert("Error fetching the user");
        } else {
            setUser(result.data.user)
        }
    };

    useEffect(()=>{
        fetchUserData();
    },[]);

    if (!user) {
        return <ActivityIndicator/>
    }

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
                       source={{uri: user.avatarUrl && 'https://cdn4.vectorstock.com/i/thumb-large/94/53/avatar-icon-person-man-vector-38549453.jpg'}}/>

                <Text style={styles.title}>{user.displayName}</Text>
                <Text style={styles.subTitle}>145 Followers | 575 Followings</Text>
            </View>

            <MasonryList pins={user.pins} onRefresh={fetchUserData}/>
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
