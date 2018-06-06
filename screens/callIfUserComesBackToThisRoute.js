export default ( props, call ) => {
    if( !props.navigation ) throw 'I need props.navigation';
    const thisRoute = props.navigation.state.routeName;
    props.navigation.addListener(
        'willFocus',
        payload => {
            if ( payload.state.routeName === thisRoute) call()
        }
    );
}
