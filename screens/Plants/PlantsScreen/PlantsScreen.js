import React from 'react';
import PlantListContainer from './PlantListContainer';
import {headerStyle, renderTitle} from '../../../components/MainHeader';

export default class PlantsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <PlantListContainer navigation={ navigation }/>
        )
    }
}

PlantsScreen.navigationOptions = () => ({
    headerStyle,
    headerTitle: renderTitle('Plantas')
});
