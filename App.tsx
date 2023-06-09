import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStackNavigator from './app/routes/MainStackNavigator';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <SafeAreaProvider>
                    <MainStackNavigator />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>

    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
