import R from 'ramda';
let logs = [];
const queryLogs = {};
let queries = {};
let mutations = {};
let queryListeners = {};
const mutationListeners = {};
const addLog = (log) => {
    logs = [...logs,log];
}
import randomcolor from 'randomcolor';
const addOperation = (color,operation) => {
    addLog({
        color,
        type: 'operation',
        scope: operation.operationName,
        time: new Date(),
        operation:R.clone(operation)
    })
}
const addOperationResult = (color, operation, operationResult) => {
    addLog({
        color,
        type: 'operationResult',
        scope: operation.operationName,
        time: new Date(),
        operation:R.clone(operation),
        operationResult
    })
}
const getLogs = () => logs;
const addQueryLog = (key,log) => {
    if(queryLogs[key] === undefined) {
        queryLogs[key] = [];
    }
    queryLogs[key].push(log);
}
const getQueryLogs = (key) => {
    return queryLogs[key] ? queryLogs[key] : []
}

const updateClientData = ( client, devToolsHookData ) => {
    if(!client.queryManager) return;
    queries = R.clone(client.queryManager.queryStore.getStore());
    mutations = R.clone(client.queryManager.mutationStore.getStore());
    R.forEach(
        (key) => {
            if(queryListeners[key] === undefined) {
                const listener = () => {
                    let color = randomcolor();
                    let lastNetworkStatus = null;
                    return (query, resultObject) => {
                        if( query && (lastNetworkStatus !== query.networkStatus) ) {
                            const log = {
                                color,
                                type:'queryListener',
                                query:query,
                                time: new Date(),
                                networkStatus: query.networkStatus,
                                result: R.clone(resultObject)
                            }
                            lastNetworkStatus = query.networkStatus;
                            addLog(log)
                            addQueryLog(key,log)
                        }
                    }
                }
                queryListeners[key] = true;
                client.queryManager.addQueryListener(key,listener());
            }
        }
    )(R.keys(queries))

    R.forEach(
        (key) => {
            if(mutationListeners[key] === undefined) {
                const listener = () => {
                    let color = randomcolor();
                    let lastNetworkStatus = null;
                    return (query, resultObject) => {
                        console.log('mutationListener',mutationListener);
                        // if( query && (lastNetworkStatus !== query.networkStatus) ) {
                        //     const log = {
                        //         color,
                        //         type:'queryListener',
                        //         query:query,
                        //         time: new Date(),
                        //         networkStatus: query.networkStatus,
                        //         result: R.clone(resultObject)
                        //     }
                        //     lastNetworkStatus = query.networkStatus;
                        //     addLog(log)
                        //     addQueryLog(key,log)
                        // }
                    }
                }
                queryListeners[key] = true;
                client.queryManager.addQueryListener(key,listener());
            }
        }
    )(R.keys(mutations))
}

export default {
    addLog,
    addOperation,
    getLogs,
    updateClientData,
    getQueries: () => queries,
    getMutations: () => mutations,
    addQueryLog,
    getQueryLogs,
    addOperationResult

}