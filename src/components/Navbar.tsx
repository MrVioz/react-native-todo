import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { FinishedScreen } from '../screens/FinishedScreen.tsx';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Filter') {
                        iconName = 'filter-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Filter" component={FinishedScreen} />
        </Tab.Navigator>
    );
};

// **Styles für die Navbar**
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#222',
        paddingBottom: 5,
        height: 60,
    },
});

export default Navbar;
