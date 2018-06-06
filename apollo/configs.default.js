const env = 'DEV';

const configs = {
    'graphqlEndpoint': 'PRODUCTION_URL'
};

let extraConfigs = null;

switch (env) {
    case 'DEV':
        extraConfigs = {
            'graphqlEndpoint': 'http://192.168.2.37:3000/graphql',
        };
        break;
    case 'PROD':
        extraConfigs = { };
        break;
    default:
        throw 'Environment ' + env + 'not supported';
}

const finalConfigs = Object.assign( configs, extraConfigs );
export default finalConfigs;
