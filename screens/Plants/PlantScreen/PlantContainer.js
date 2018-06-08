import React from 'react';
import R from 'ramda';
import Plant from './Plant';
import { withProps } from 'recompose';
import withQuery from '../../../connectors/withQuery';
import PLANT_QUERY from '../../../graphQL/queries/PLANT_QUERY';
import PLANT_CACHED_QUERY from '../../../graphQL/queries/PLANT_CACHED_QUERY';
import CURRENT_USER_QUERY from "../../../graphQL/queries/CURRENT_USER_QUERY";

export default R.compose(
    withQuery(
        PLANT_QUERY,
        (props) => ({
            variables: { id: props.plantId },
            fetchPolicy: "cache-and-network",
            bypassActivityIndicator: true,
            queryDataName: "networkPlantQueryData"
        })
    ),
    withQuery(
        PLANT_CACHED_QUERY,
        (props) => ({
            variables: { id: props.plantId },
            fetchPolicy: "cache-only",
            queryDataName: "cachedPlantQueryData"
        })
    ),
    withProps(
        (props) => {
            let plant = null;
            let loadingComplete = false;
            const networkQueryData = props.networkPlantQueryData.data;

            if( Object.keys(networkQueryData).length !== 0 ) {
                plant = props.networkPlantQueryData.data.plant;
                loadingComplete = true;
            } else {
                plant = props.cachedPlantQueryData.data.plant;
                loadingComplete = false;
            }
            return ({
                plant,
                loadingComplete
            })
        }
    )
)(Plant);
