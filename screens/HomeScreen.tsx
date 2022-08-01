import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Pin} from "../components/Pin";
import pins from '../assets/data/pins';

export type PinPropsType = {
    title: string
    image: string
    id: string
}

export default function HomeScreen({navigation}: RootTabScreenProps<'TabOne'>) {
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
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
    },
    column:{
        flex: 1
    }
});
