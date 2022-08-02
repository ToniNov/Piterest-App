import {RootTabScreenProps} from '../types';
import pins from '../assets/data/pins';
import {MasonryList} from "../constants/MasonryList";
import {useEffect} from "react";
import {useNhostClient} from "@nhost/react";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {

    const nhost = useNhostClient();

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
        console.log(response)
    }

    useEffect(() => {
        fetchPins()
    }, [])

    return (
        <MasonryList pins={pins}/>
    );
}
