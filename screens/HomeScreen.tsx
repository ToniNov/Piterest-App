import {RootTabScreenProps} from '../types';
import pins from '../assets/data/pins';
import {MasonryList} from "../constants/MasonryList";

export default function HomeScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    return (
        <MasonryList pins={pins} />
    );
}
