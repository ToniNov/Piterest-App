import {RootTabScreenProps} from '../types';
import {MasonryList} from "../constants/MasonryList";
import {useEffect, useState} from "react";
import {useNhostClient} from "@nhost/react";
import {Alert} from "react-native";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

    const nhost = useNhostClient();

    const[pins,setPins]= useState([])

    const fetchPins = async () => {
        const response = await nhost.graphql.request(`
            query MyQuery {
              pins {
               created_at
               id
               image
               title
               user_id
             }
            }
        `);

        if(response.error){
            Alert.alert("Error fetching pins")
        } else {
            setPins(response.data.pins)
        }
    };

    useEffect(() => {
        fetchPins();
    }, [])

    return (
        <MasonryList pins={pins}/>
    );
}
