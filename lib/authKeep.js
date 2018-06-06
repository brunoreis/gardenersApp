import Expo from 'expo';

export default {
    keep: (token) => Expo.SecureStore.setItemAsync('authToken', token),
    retrieve: () => Expo.SecureStore.getItemAsync('authToken'),
    clean: () => Expo.SecureStore.deleteItemAsync('authToken')
}
