export default ({queryData, connectionName}) => (event) => {
    const endCursor = queryData.data[connectionName].pageInfo.endCursor;
    const fetchMore = queryData.fetchMore;

    const halfElementHeight = event.nativeEvent.contentSize.height/2;
    const amountScrolled = event.nativeEvent.contentOffset.y;
    if( amountScrolled > halfElementHeight ) {
        if(endCursor !== this.lastFetchCursor) {
            fetchMore({
                variables: {after: endCursor },
                updateQuery: (previous, { fetchMoreResult }) => {
                    if (
                        !fetchMoreResult[connectionName] ||
                        fetchMoreResult[connectionName].length === 0
                    ) {
                        return previous;
                    }
                    const edges = [ ...previous[connectionName], ...fetchMoreResult[connectionName] ];
                    return {
                        ...fetchMoreResult,
                        [connectionName]:{
                            ... fetchMoreResult[connectionName],
                            edges
                        },
                    }
                },
            });
            this.lastFetchCursor = endCursor;
        }
    }
}
