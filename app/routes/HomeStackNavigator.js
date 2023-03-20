import React from "react";
import ProductScreen from "../screens/ProductScreen";
import CategoryScreen from "../screens/CategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main home"
                component={HomeScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Product"
                component={ProductScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                })}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={({ route }) => ({
                    title: route.params?.name,
                })}
            />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;
