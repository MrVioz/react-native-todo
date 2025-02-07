import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Navbar from './src/components/Navbar.tsx';


function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };

    return (
        <NavigationContainer>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <Navbar />
        </NavigationContainer>
    );

}


export default App;
