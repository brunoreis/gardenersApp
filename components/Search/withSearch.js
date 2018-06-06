import React from 'react';
import SearchBar from './SearchBar'
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (configs) => (WrappedComponent) => {
    class newClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searchText: null
            }
        }

        renderSearchbar = () => (
            <SearchBar
                onCancel={ () => this.setState({ searchText: null }) }
                onSearch={ (searchText) => this.setState({searchText}) }
                searchPlaceholder={configs.searchPlaceholder}
            />
        );

        render() {
            const { searchText } = this.state;
            const searchBar = this.renderSearchbar();
            return (
                <WrappedComponent
                    {...this.props}
                    emptyMessage = { searchText ? configs.emptyMessage : null }
                    searchText = {searchText}
                    searchBar={searchBar}
                />
            )
        }
    }
    return hoistNonReactStatics(newClass, WrappedComponent);
}
