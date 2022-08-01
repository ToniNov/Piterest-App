import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {Pin} from "../components/Pin";

export type PinPropsType = {
    title: string
    image: string
}

export default function HomeScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>

            <Pin pin={{
                title: "Title",
                image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/pinterest/0.jpeg"
            }}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});
