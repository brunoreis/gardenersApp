import React from 'react';
import {
    headerStyle,
    renderBackButton,
    headerTitle,
    headerRightIcon
} from '../../../components/MainHeader';
import { View } from 'react-native';
import PlantContainer from './PlantContainer';
import withQuery from "../../../connectors/withQuery";
import CURRENT_USER_QUERY from "../../../graphQL/queries/CURRENT_USER_QUERY";

class PlantScreen extends React.Component {
    componentDidMount() {
        const { queryData, navigation } = this.props;
        const plantCreatedById = navigation.state.params.plantCreatedById;
        const currentUserId = queryData.data.currentUser.current_user.id;

        navigation.setParams({ currentUserHasCreated: plantCreatedById === currentUserId });
    }
    render() {
        const { navigation } = this.props;
        return (
            <PlantContainer plantId={navigation.state.params.plantId}/>
        );
    }
}

PlantScreen.navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;
    let currentUserHasCreated = params.currentUserHasCreated;
    if (currentUserHasCreated === undefined) currentUserHasCreated = false;
    return ({
        headerStyle,
        headerTitle: headerTitle(params.plantName),
        headerLeft: renderBackButton(navigation),
        headerRight: currentUserHasCreated
            ? headerRightIcon({
                name: 'Editar',
                isButtonText: true,
                onPress: () => navigation.navigate('PlantEdit', { plantId: navigation.state.params.plantId })
            })
            : <View style={{ marginLeft: 10 }} />
    });
}

export default withQuery(CURRENT_USER_QUERY)(PlantScreen);
