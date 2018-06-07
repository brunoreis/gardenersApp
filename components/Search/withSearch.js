import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import SearchBar from './SearchBar'

export default (configs) => (WrappedComponent) => {
    class newClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                searchText: null,
                activeSearchBar: false
            }
        }

        renderSearchBar = () => {
            const { activeSearchBar } = this.state;
            return (
                <SearchBar
                    active={activeSearchBar}
                    onSearch={ (searchText) => this.setState({ searchText }) }
                    searchPlaceholder={configs.searchPlaceholder}
                    onActivate={() => this.setState({ activeSearchBar: true })}
                    onCancel={() => this.setState({ activeSearchBar: false, searchText: null })}
                />
            )
        }

        render() {
            const {
                activeSearchBar,
                searchText
            } = this.state;
            const searchBar = this.renderSearchBar();
            return (
                <WrappedComponent
                    {...this.props}
                    emptyMessage = { searchText ? configs.emptyMessage : null }
                    searchText = {searchText}
                    searchBar={searchBar}
                    activeSearchBar={activeSearchBar}
                />
            )
        }
    }

    return hoistNonReactStatics(newClass, WrappedComponent);

}
