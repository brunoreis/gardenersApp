export default (value) => {
    switch (value) {
        case 1: return 'loading'
        case 2: return 'setVariables'
        case 3: return 'fetchMore'
        case 4: return 'refetch'
        case 6: return 'poll'
        case 7: return 'ready'
        case 8: return 'error'
    }
}