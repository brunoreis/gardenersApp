import React from 'react';
import R from 'ramda';
import PlantList from './PlantList';
import { withProps } from 'recompose';
import { withNavigation } from 'react-navigation';
import withQuery from '../../../connectors/withQuery';
import withSearch from '../../../components/Search/withSearch';
import PLANTS_SEARCH_QUERY from "../../../graphQL/queries/PLANTS_SEARCH_QUERY";

export default R.compose(
    withNavigation,
    withSearch({
        emptyMessage: "Nenhuma planta foi encontrada. 😢",
        searchPlaceholder: 'Buscar'
    }),
    withQuery(
        PLANTS_SEARCH_QUERY,
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
            }
        })
    ),
    withProps(
        (ownProps) => {
            return ({
                header: ownProps.searchBar,
                lockHeader: ownProps.activeSearchBar
            })
        }
    )
)(PlantList);
