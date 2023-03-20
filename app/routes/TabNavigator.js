import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import CartScreen from "../screens/CartScreen";
import FavoritScreen from "../screens/FavoritScreen";
import HomeStackNavigator from "./HomeStackNavigator";
const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: companyColor,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={({ route }) => ({
                    title: route.params?.name,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'home'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Catalog" component={ProductScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'apps'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Favorit" component={FavoritScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'heart'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Cart" component={CartScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'cart'} size={size} color={color} />
                })}
            />
        </Tab.Navigator>
    )
} 

export default TabNavigator;