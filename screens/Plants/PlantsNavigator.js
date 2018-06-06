import {createSwitchNavigator} from 'react-navigation';
import PlantsScreen from './PlantsScreen/PlantsScreen';
import PlantScreen from './PlantScreen/PlantScreen';

export default createSwitchNavigator(
    {
        Plants: {
            screen: PlantsScreen,
        },
        Plant: {
            screen: PlantScreen,
        }
    },
    {
        headerMode: 'none'
    }
);
