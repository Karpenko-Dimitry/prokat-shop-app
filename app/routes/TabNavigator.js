import React, { useMemo } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { companyColor } from "../services/ColorService";
import CartScreen from "../screens/CartScreen";
import FavoritScreen from "../screens/FavoritScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import CategoriesScreen from "../screens/CategoriesScreen";
import { View, Text, StyleSheet } from "react-native";
import { scale } from "../services/HelperService";
import { useSelector } from "react-redux";
import InfoStackNavigator from "./InfoStackNavigator";

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const cartStore = useSelector((state) => state.cartStore.products);

    const countCart = useMemo(() => {
        return cartStore.reduce((a, b) => a + b.count, 0);
    }, [cartStore]);

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
                    title: 'Главная',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'home'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Catalog" component={CategoriesScreen}
                options={({ route }) => ({
                    title: 'Каталог',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'apps'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Favorit" component={FavoritScreen}
                options={({ route }) => ({
                    title: 'Списки',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'heart'} size={size} color={color} />
                })}
            />
            <Tab.Screen name="Cart" component={CartScreen}
                options={({ route }) => ({
                    title: 'Корзина',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.cartContainer}>
                            <Ionicons name={'cart'} size={size} color={color} />
                            {countCart >= 1 && (
                                <View style={styles.cartLabel}>
                                    <Text style={styles.cartLabelText}>{countCart}</Text>
                                </View>
                            )}

                        </View>
                    )
                })}
            />
            <Tab.Screen name="Info" component={InfoStackNavigator}
                options={({ route }) => ({
                    title: 'Инфо',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => <Ionicons name={'information-circle'} size={size} color={color} />
                })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    cartContainer: {

    },
    cartLabel: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: scale(-5),
        width: scale(14),
        height: scale(14),
        borderRadius: scale(14),
        backgroundColor: companyColor
    },
    cartLabelText: {
        color: 'white',
        fontSize: scale(8)
    }
})


export default TabNavigator;