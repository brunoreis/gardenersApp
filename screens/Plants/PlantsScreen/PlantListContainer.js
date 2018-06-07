import React from 'react';
import R from 'ramda';
import PlantList from './PlantList';
import { withProps } from 'recompose';
import withQuery from '../../../connectors/withQuery';
import PLANTS_QUERY from '../../../graphQL/queries/PLANTS_QUERY';
import withSearch from '../../../components/Search/withSearch';

export default R.compose(
    withSearch({
        emptyMessage: "Nenhuma planta foi encontrada. 😢",
        searchPlaceholder: 'Buscar'
    }),
    withQuery(
        (props) => ({
            variables: {
                first: 15,
                filter: props.searchText
                    ? {
                        name_contains: props.searchText,
                        OR: {
                            edible_parts_contains: props.searchText
                        }
                    } : {},
            },
            extraProps:{
                emptyMessage: props.emptyMessage ? props.emptyMessage : "Não há plantas cadastradas. 😢"
            },
            query: PLANTS_QUERY
        })
    ),
    withProps(
        (ownProps) => {
            return ({
                header: ownProps.searchBar
            })
        }
    )
)(PlantList);
