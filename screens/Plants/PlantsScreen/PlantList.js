import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PlantItem from './PlantItem'
import onScroll from '../../../lib/onScroll';
import callIfUserComesBackToThisRoute from '../../callIfUserComesBackToThisRoute';
import Colors from "../../../constants/Colors";

class PlantList extends React.Component {
    componentDidUpdate() {
        const { queryData } = this.props;
        callIfUserComesBackToThisRoute(
            this.props,
            () => {
                queryData.refetch()
            }
        )
    }

    renderHeader = () => {
        const { header } = this.props;
        return (
            <View>
                { header }
                { this.renderEmptyMessage() }
            </View>
        )
    }

    renderEmptyMessage = () => {
        const {
            queryData: {
                networkStatus,
                data
            },
            emptyMessage
        } = this.props;

        if (networkStatus === 7 && data.length === 0) {
            return (
                <Text style={{ textAlign: 'center', marginTop: 15 }}>
                    {emptyMessage}
                </Text>
            )
        }
    }

    render() {
        const {
            queryData,
            navigation,
        } = this.props;
        const { data, networkStatus, refetch } = queryData;
        const { plants } = data;
        const refreshing = networkStatus === 4 || networkStatus === 2;
        return (
            <FlatList
                ListHeaderComponent = { this.renderHeader }
                data={plants ? plants : []}
                refreshing={ refreshing }
                onRefresh={()=> refetch()}
                keyExtractor={ (item) => '' + item.id }
                style={{ flex: 1, backgroundColor: '#EEE' }}
                renderItem={ this.renderItemFunction({navigation}) }
                onMomentumScrollBegin={this.props.onMomentumScrollBegin}
                //onScroll={ onScroll({queryData, connectionName: 'plants'}) }
            />
        );
    }

    renderItemFunction = ({ navigation }) => ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{ backgroundColor: Colors.white }}
                onPress={() => navigation.navigate('Plant', { plantId: item.id })}>
                <PlantItem
                    plant={item}
                    navigation={navigation}
                />
            </TouchableOpacity>
        )
    }
}

export default PlantList;
