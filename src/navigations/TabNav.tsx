import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import Home from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Product from '../screens/ProductScreen';
import Courses from '../screens/CoursesScreen';

const Tab = createBottomTabNavigator();

function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: 'fade', 
                tabBarShowLabel: true, 
                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: 2,
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName: string = 'home';
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Products') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Courses') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: '#16a34a',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 6,
                    width: '90%',
                    alignSelf: 'center',
                    marginHorizontal: '5%',
                    elevation: 5,
                    backgroundColor: '#ffffff',
                    borderRadius: 30,
                    height: 60,
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    ...Platform.select({
                        android: { paddingBottom: 10 },
                        ios: { paddingBottom: 20 }
                    })
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Products" component={Product} />
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default TabNav;